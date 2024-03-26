"use client"

import { useCreateBoard, useUpdateBoard } from "@/ahooks/useBoard"

import { FC } from "react"
import { useForm } from "react-hook-form"

import { AxiosError } from "axios"

import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { BoardSchema, IBoardSchema } from "@/actions/client/boardAction"

import { zodResolver } from "@hookform/resolvers/zod"

import { IBoard } from "@/types/board"

type BoardFormPropsType = {
  board?: IBoard
  handleClose: () => void
}

export const BoardForm: FC<BoardFormPropsType> = (
  props: BoardFormPropsType
) => {
  const { board, handleClose } = props

  const form = useForm<IBoardSchema>({
    mode: "onChange",
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      title: board?.title || "",
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createBoard, isPending: pendingBoard } = useCreateBoard()
  const { mutateAsync: updateBoard, isPending: pendingUpdate } = useUpdateBoard(
    board?.id || ""
  )
  const isPending = pendingBoard || pendingUpdate

  function onSubmit(data: IBoardSchema) {
    const dirtyFields = formState.dirtyFields

    const changedFields: IBoardSchema = Object.keys(dirtyFields).reduce(
      (result, key) => {
        result[key as keyof IBoardSchema] = data[key as keyof IBoardSchema]

        return result
      },
      {} as IBoardSchema
    )

    const mutation = board ? updateBoard : createBoard

    mutation(changedFields, {
      onSuccess: () => {
        handleClose()
        toast({ title: "Success", description: "Create success" })
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

  return (
    <div className="my-2  flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start justify-between gap-4">
            <FormInput name="title" placeholder="Title" />
          </div>

          <div className="mt-[20px] flex max-w-[800px] justify-between">
            <Button variant="default_out" onClick={handleClose}>
              Cansel
            </Button>
            <Button
              type="submit"
              className=""
              disabled={
                isPending || !formState.isValid
                  ? true
                  : formState.isDirty
                  ? false
                  : true
              }
            >
              Save board
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
