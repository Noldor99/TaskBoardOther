import { useGetBoard } from "@/ahooks/useBoard"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { DialogBoardForm } from "./_components/DialogBoardForm"
import TodoComponent from "./_components/todo/TodoComponent"
import { DrawerHisrory } from "./_components/Draver"

const Home = () => {
  const getResult = useGetBoard({
    enabled: true,
    params: {
      limit: "12",
    },
  })

  const { data: boardData, refetch } = getResult

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="container">
      <div className="mb-5 flex flex-wrap items-start justify-start gap-4">
        <DialogBoardForm />
      </div>
      <div className={cn("flex flex-col gap-2")}>
        {boardData?.boards.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-5 paper-rounded">
              <p className="text-h2">{item.title}</p>
              <div className="flex justify-center items-center gap-4">
                <DrawerHisrory />
                <DialogBoardForm id={item.id} />
              </div>
            </div>
            <TodoComponent board={item} />
          </div>
        ))}
      </div>
      {boardData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
    </div>
  )
}

export default Home
