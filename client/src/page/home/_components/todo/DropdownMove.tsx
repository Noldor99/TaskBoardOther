/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { useUpdateTodo } from "@/ahooks/useTodo"
import { variantItems } from "./Constants"
import { useTypedDispatch } from "@/hook/useTypedDispatch"
import { HistoryAction } from "@/store/slice/historySlice"
import { ITodo } from "@/types/todo"

interface DropdownMoveProps {
  todo: ITodo
}

export function DropdownMove({ todo }: DropdownMoveProps) {
  const [open, setOpen] = useState(false)

  const { addHistory } = useTypedDispatch()
  const { mutateAsync: updateTodo } = useUpdateTodo(todo.id)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="black_out"
          className={cn(
            "w-full justify-between  bg-white capitalize hover:!bg-transparent hover:!text-black"
          )}
        >
          Move to
          <IconChevronDown
            className={cn(
              "border-box ml-2 h-6  w-6 p-1 transition-transform",
              open && "rotate-180 transform "
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        {variantItems.map((item: any) => (
          <DropdownMenuItem
            key={item.value}
            className="flex gap-5"
            onClick={() => {
              updateTodo({ variant: item.value })
              addHistory({
                action: HistoryAction.Move,
                id: todo.id,
                todoName: todo.title,
                variantOld: todo.variant,
                variant: item.value,
              })
            }}
          >
            <p className="text-lg1">{item.label}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
