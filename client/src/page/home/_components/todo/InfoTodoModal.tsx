import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { dateHelpers } from "@/lib/dateHelpers"
import { ITodo } from "@/types/todo"
import {
  IconCalendarDue,
  IconEmphasis,
  IconPlaystationCircle,
} from "@tabler/icons-react"

import { ReactNode } from "react"
import HistoryRender from "../HistoryRender"

interface InfoTodoModalProps {
  todo: ITodo
  children: ReactNode
}

const InfoTodoModal = ({ todo, children }: InfoTodoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="sm:flex-[60%] ">
            <DialogHeader>
              <p className="text-h3 font-bold">{todo.title}</p>
            </DialogHeader>
            <div className="max-w-[300px] space-y-3 mt-4">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <IconPlaystationCircle />
                  <p>Status</p>
                </div>
                <p className="font-bold">{todo.variant}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <IconCalendarDue />
                  <p>Deadline</p>
                </div>
                <p className="font-bold">
                  {dateHelpers.getDayMonthYear(todo.deadline)}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <IconEmphasis />
                  <p>Priority</p>
                </div>
                <p className="font-bold">{todo.priority}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-h3 font-bold mb-3">Description</p>
              <p>{todo.description}</p>
            </div>
          </div>
          <div className="flex-[33%] paper-rounded overflow-auto ">
            <HistoryRender id={todo.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InfoTodoModal
