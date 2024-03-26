import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { historyActions } from "@/store/slice/historySlice"

const actions = {
  ...historyActions,
}

export const useTypedDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
