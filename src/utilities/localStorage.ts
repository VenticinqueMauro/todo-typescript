import { Task } from "@/interfaces"

export const setItem = (key: string, data: Task[]) => {
    return localStorage.setItem(key, JSON.stringify(data))
}

export const getItem = (key: string) : Task[] => {
    return JSON.parse(localStorage.getItem(key)!)
}