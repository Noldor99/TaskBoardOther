
import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'

import { ITodo, ITodos, TodoPriority, TodoVariant } from '@/types/todo';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [(typeof obj)[keyof T]]
}

export const TodoSchema = z.object({
  boardId: z.string().optional(),
  title: z
    .string()
    .min(3, { message: 'title must be at least 3 characters.' })
    .max(50, { message: 'title must be at most 50 characters.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters.' })
    .max(300, { message: 'Description must be at most 300 characters.' }),
  variant: z.enum(getValues(TodoVariant), {
    errorMap: () => ({
      message: 'Please select your variant',
    }),
  }),
  priority: z.enum(getValues(TodoPriority), {
    errorMap: () => ({
      message: 'Priority select your variant',
    }),
  }),
  deadline: z.date(),
});

export type ITodoSchema = z.infer<typeof TodoSchema>

export interface QueryTodoParams {
  page?: string;
  limit?: string;
  variant?: TodoVariant;
}

export interface ApiTodo {
  create: (body: ITodoSchema) => Promise<ITodo>;
  getAll: (params: QueryTodoParams) => Promise<ITodos>;
  getOne: (id: string) => Promise<ITodo>;
  update: (todoId: string, data: Partial<ITodoSchema>) => Promise<ITodo>;
  remove: (id: string) => Promise<ITodo>;
}

export const apiTodo: ApiTodo = {
  create: (body) => api.post('/todo', body).then(qw),
  getAll: (params) => api.get('/todo', { params }).then(qw),
  getOne: (id) => api.get(`/todo/${id}`).then(qw),
  update: (todoId, body) => api.patch(`/todo/${todoId}`, body).then(qw),
  remove: (id) => api.delete(`/todo/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;