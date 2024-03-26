import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URLL ?? "http://localhost:7777/api",
  withCredentials: true,
})

