import { Task } from "@/interfaces";
import { getItem } from "@/utilities/localStorage";
import { createSlice } from "@reduxjs/toolkit";


const initialState: Task[] = getItem('tasks') || []

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, {payload} : {payload: Task}) => {
            state.push(payload)
        },
        editTask: (state, action : {payload : Task}) => {            
            const { id, title, description, priority, category } = action.payload
            const foundTask = state.find(task => task.id === id) 
            if(foundTask){
                foundTask.title = title
                foundTask.description = description
                foundTask.priority = priority
                foundTask.category = category
            }
        },
        deleteTask: (state, {payload} : {payload: number}) => {
            const taskFound = state.find(task => task.id === payload)
            taskFound && state.splice(state.indexOf(taskFound), 1)
        },
        deleteAll: (state)  => {
            state = []
            localStorage.removeItem('tasks')
            return state
            
        },
        filterTasks: (state, {payload} : {payload: string | undefined}) => {
            state = state.filter( task => task.category !== payload)
            console.log(state);
            return state
        },

    }
})


export const { addTask, deleteTask, editTask, filterTasks, deleteAll } = taskSlice.actions
export default taskSlice.reducer