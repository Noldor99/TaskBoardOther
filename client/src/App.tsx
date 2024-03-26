import React from "react"
import { Routes, Route } from "react-router-dom"
import LayoutWrapper from "./components/layout/LayoutWrapper"
import NotFoundBlock from "./components/NotFoundBlock"
import Home from "./page/home/Home"

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFoundBlock />} />
      </Routes>
    </React.Suspense>
  )
}

export default App
