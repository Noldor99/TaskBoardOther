export enum TodoVariant {
  todo = 'todo',
  planned = 'planned',
  progress = 'progress',
  closed = 'closed',
}

export enum TodoPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface ITodos {
  totalCount: number
  todos: ITodo[]
}

export interface ITodo {
  id: string
  title: string
  description: string
  variant: TodoVariant
  priority: TodoPriority
  deadline: Date
  createdAt: Date
}
