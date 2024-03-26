"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react"
import { DialogTodoForm } from "./DialogTodoForm"
import { useState } from "react"
import InfoTodoModal from "./InfoTodoModal"
import { ITodo } from "@/types/todo"
import { useDeleteTodoById } from "@/ahooks/useTodo"

interface DropdownActionProps {
  todo: ITodo
  boardId: string
}

export function DropdownAction({ boardId, todo }: DropdownActionProps) {
  const [openmodal, setOpenModal] = useState(false)

  const handleOpenModalChangeModal = () => {
    setOpenModal(!openmodal)
  }

  const { mutateAsync: deleteTodo } = useDeleteTodoById()

  return (
    <DropdownMenu open={openmodal} onOpenChange={handleOpenModalChangeModal}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>
          <InfoTodoModal todo={todo}>
            <div className="flex gap-5">
              <IconEye />
              <p className="text-lg1">View</p>
            </div>
          </InfoTodoModal>
        </DropdownMenuLabel>
        <DropdownMenuLabel onClick={() => setOpenModal(true)}>
          <DialogTodoForm id={todo.id} boardId={boardId}>
            <div className="flex gap-5">
              <IconEdit />
              <p className="text-lg1">Edit</p>
            </div>
          </DialogTodoForm>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex gap-5" onClick={() => deleteTodo(todo.id)}>
            <IconTrash />
            <p className="text-lg1">Delete</p>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
