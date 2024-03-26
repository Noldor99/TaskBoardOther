import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URLL ?? "https://taskboardother.onrender.com/api",
  withCredentials: true,
})

