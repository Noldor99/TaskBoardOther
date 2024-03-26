import { useTypedSelector } from "@/hook/useTypedSelector"
import { dateHelpers } from "@/lib/dateHelpers"
import { HistoryAction } from "@/store/slice/historySlice"

import Line from "@/components/ui/line"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HistoryRenderProps {
  id?: string
}

const HistoryRender = ({ id }: HistoryRenderProps) => {
  const { actions } = useTypedSelector((s) => s.history)

  const filteredActions = id
    ? actions.filter((item) => item.id === id)
    : actions

  return (
    <ScrollArea className={cn(id ? "h-[40vh]" : "h-[90vh]")}>
      {filteredActions.map((item, index) => (
        <div key={index} className="mt-3">
          {item.action === HistoryAction.Create && (
            <div>
              <span>You add </span>
              <span className="font-bold">{item.todoName}</span>
              <span> to {item.variant}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
          {item.action === HistoryAction.ReName && (
            <div>
              <span>You rename </span>
              <span className="font-bold">{item.todoOldName}</span>
              <span> to {item.todoName}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
          {item.action === HistoryAction.ReDescription && (
            <div>
              <span>You update description of </span>
              <span className="font-bold">{item.todoName}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
          {item.action === HistoryAction.Move && (
            <div>
              <span>You move </span>
              <span className="font-bold">{item.todoName}</span>
              <span> from {item.variantOld}</span>
              <span> to {item.variant}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
          {item.action === HistoryAction.Priority && (
            <div>
              <span>You change priority of </span>
              <span className="font-bold">{item.todoName}</span>
              <span> from {item.priorityOld}</span>
              <span> to {item.priority}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
          {item.action === HistoryAction.Deadline && (
            <div>
              <span>You set deadline for </span>
              <span className="font-bold">{item.todoName}</span>
              <span> from {dateHelpers.getDayMonthYear(item.deadlineOld)}</span>
              <span> to {dateHelpers.getDayMonthYear(item.deadline)}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
          {item.action === HistoryAction.Delete && (
            <div>
              <span>You delete </span>
              <span className="font-bold">{item.todoName}</span>
              <p>{dateHelpers.getMonthDayHour(item.data)}</p>
              <Line />
            </div>
          )}
        </div>
      ))}
    </ScrollArea>
  )
}

export default HistoryRender
