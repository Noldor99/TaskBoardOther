import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import HistoryRender from "./HistoryRender"

export function DrawerHisrory() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="black_out">History</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <HistoryRender />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
