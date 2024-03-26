import { Outlet } from "react-router-dom"

const Mainlayout = () => (
  <div className={"flex min-h-screen flex-col"}>
    <div className="fixed left-0 right-0 top-0 z-[-1]">
      <div className="h-[80vh] bg-background blur-[90px] filter"></div>
    </div>
    {/* <Header /> */}
    <main className="flex-1">
      <Outlet />
    </main>
    {/* <Footer /> */}
  </div>
)

export default Mainlayout
