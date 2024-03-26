import { IBoard } from "@/types/board"
import { DialogTodoForm } from "./DialogTodoForm"
import { cn } from "@/lib/utils"
import { DropdownAction } from "./DropdownAction"
import { IconCalendarEvent } from "@tabler/icons-react"
import { dateHelpers } from "@/lib/dateHelpers"
import { Badge } from "@/components/ui/badge"
import { TodoVariant } from "@/types/todo"
import { DropdownMove } from "./DropdownMove"

interface TodoComponentProps {
  board: IBoard
}

const TodoComponent = ({ board }: TodoComponentProps) => {
  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        )}
      >
        {[
          { value: TodoVariant.todo, label: "To Do" },
          { value: TodoVariant.progress, label: "Progress" },
          { value: TodoVariant.planned, label: "Planned" },
          { value: TodoVariant.closed, label: "Closed" },
        ].map((item) => (
          <div key={item.value} className="paper-sharp">
            <div
              className={cn(
                "p-1 flex justify-between items-center",
                "border-t border-b border-black "
              )}
            >
              <p className="text-h3">{item.label}</p>
              <p className="text-h3">
                {board.todos.reduce((akk, todo) => {
                  if (todo.variant === item.value) {
                    akk++
                  }
                  return akk
                }, 0)}
              </p>
            </div>
            <div className="my-4 flex flex-col">
              <DialogTodoForm boardId={board.id} />
            </div>
            <div className="space-y-3 mt-4">
              {board.todos
                .filter((todo) => todo.variant === item.value)
                .map((item) => (
                  <div key={item.id} className="paper-rounded space-y-3">
                    <div className="flex justify-between">
                      <p>{item.title}</p>
                      <DropdownAction todo={item} boardId={board.id} />
                    </div>
                    <p className="line-clamp-2">{item.description}</p>
                    <div className="flex gap-3">
                      <IconCalendarEvent />
                      <span>{dateHelpers.getDayMonthYear(item.deadline)}</span>
                    </div>
                    <Badge variant="muted">{item.priority}</Badge>
                    <DropdownMove todo={item} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoComponent
