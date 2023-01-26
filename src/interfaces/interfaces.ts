export interface Task {
    id: number,
    title: string,
    description: string,
    priority: string,
    category?: string | string[],
    commentary?: string,
    completed: boolean,
}

export interface arrayCategoryTask{
    category: categoryTask[]
}

export interface categoryTask {
    name: string
    tasks?: Task[]
}

