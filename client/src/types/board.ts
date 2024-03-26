import { ITodo } from "./todo"

export interface IBoards {
  totalCount: number
  boards: IBoard[]
}

export interface IBoard {
  id: string
  title: string
  createdAt: string
  todos: ITodo[]
}

