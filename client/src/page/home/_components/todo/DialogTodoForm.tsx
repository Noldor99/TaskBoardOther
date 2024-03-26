"use client"

import { useGetTodoById } from "@/ahooks/useTodo"

import { ReactNode, useState } from "react"

import { IconEdit, IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { TodoForm } from "./TodoForm"

interface DialogRoomProps {
  id?: string | undefined
  boardId: string
  children?: ReactNode
}

export function DialogTodoForm({ id, boardId, children }: DialogRoomProps) {
  const { data: todo, isFetched } = useGetTodoById(id!)

  const [open, setOpen] = useState(false)

  const handleOpenChange = () => {
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {id ? (
          children ? (
            children
          ) : (
            <Button className="w-full" variant="black_out">
              <IconEdit />
            </Button>
          )
        ) : (
          <Button variant="black_out">
            <IconPlus className="mr-2" />
            Add todo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-h2 mb-3 text-center font-normal">
            {id ? "Edit todo" : "Create new todo"}
          </DialogTitle>
        </DialogHeader>
        {id ? (
          isFetched && (
            <TodoForm
              todo={todo}
              boardId={boardId}
              handleClose={handleOpenChange}
            />
          )
        ) : (
          <TodoForm boardId={boardId} handleClose={handleOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
