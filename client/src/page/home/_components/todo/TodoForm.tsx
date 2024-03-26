"use client"

import { useCreateTodo, useUpdateTodo } from "@/ahooks/useTodo"

import { FC, useId } from "react"
import { useForm } from "react-hook-form"

import { AxiosError } from "axios"

import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { TodoSchema, ITodoSchema } from "@/actions/client/todoAction"

import { zodResolver } from "@hookform/resolvers/zod"

import { ITodo, TodoPriority } from "@/types/todo"
import { FormRadioGroup, TRadioItem } from "@/components/form/FormRadioGroup"
import FormCalendar from "@/components/form/FormCalendar"
import { variantItems } from "./Constants"
import { historyToSlice } from "@/utils"
import { useTypedDispatch } from "@/hook/useTypedDispatch"

type TodoFormPropsType = {
  todo?: ITodo
  handleClose: () => void
  boardId: string
}

const priorityItems: TRadioItem[] = [
  { value: TodoPriority.high, label: "High" },
  { value: TodoPriority.medium, label: "Medium" },
  { value: TodoPriority.low, label: "Low" },
]

export const TodoForm: FC<TodoFormPropsType> = (props: TodoFormPropsType) => {
  const { todo, handleClose, boardId } = props

  const dispatch = useTypedDispatch()

  const form = useForm<ITodoSchema>({
    mode: "onChange",
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      priority: todo?.priority,
      variant: todo?.variant,
      deadline: todo?.deadline
        ? new Date(new Date(todo.deadline as Date).setHours(0, 0, 0, 0))
        : new Date(new Date().setHours(0, 0, 0, 0)),
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createTodo, isPending: pendingTodo } = useCreateTodo()
  const { mutateAsync: updateTodo, isPending: pendingUpdate } = useUpdateTodo(
    todo?.id || ""
  )
  const isPending = pendingTodo || pendingUpdate

  function onSubmit(data: ITodoSchema) {
    const dirtyFields = formState.dirtyFields

    const changedFields: ITodoSchema = Object.keys(dirtyFields).reduce(
      (result, key) => {
        const value = data[key as keyof ITodoSchema]

        if (value instanceof Date) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          result[key as keyof Omit<ITodoSchema, "deadline">] =
            value.toISOString()
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          result[key as keyof ITodoSchema] =
            value as ITodoSchema[keyof ITodoSchema]
        }

        return result
      },
      {} as ITodoSchema
    )

    changedFields.boardId = boardId

    const mutation = todo ? updateTodo : createTodo

    mutation(changedFields, {
      onSuccess: () => {
        todo && historyToSlice(dispatch, changedFields, todo)
        handleClose()
        toast({
          title: "Success",
          description: `${todo ? "Update" : "Create"} success`,
        })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })
            ?.message || "Unknown error"

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      },
    })
  }

  const formId = useId()

  return (
    <div className="my-2  flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)} id={formId}>
          <div className="flex flex-col items-start justify-between gap-4">
            <FormInput name="title" placeholder="Title" />
            <FormInput name="description" placeholder="Description" />

            <FormCalendar name="deadline" />

            <div className="p-[10px] mt-2 flex justify-between w-full">
              <div>
                <p className="mb-2">Variant:</p>
                <FormRadioGroup name="variant" radioItems={variantItems} />
              </div>
              <div>
                <p className="mb-2">Priority:</p>
                <FormRadioGroup name="priority" radioItems={priorityItems} />
              </div>
            </div>
          </div>

          <div className="mt-[20px] flex max-w-[800px] justify-between">
            <Button variant="default_out" onClick={handleClose}>
              Cansel
            </Button>

            <Button
              type="submit"
              className=""
              form={formId}
              disabled={
                isPending || todo
                  ? !formState.isValid
                    ? true
                    : formState.isDirty
                    ? false
                    : true
                  : false
              }
            >
              Save todo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
