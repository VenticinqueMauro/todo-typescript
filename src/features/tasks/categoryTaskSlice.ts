import { categoryTask, Task } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: categoryTask[] = [
    {
        name: 'trabajo',
        tasks: []
    },
    {
        name: 'estudio',
        tasks: []
    },
    {
        name: 'salud y Deporte',
        tasks: []
    },
]


const categoryTaskSlice = createSlice({
    name: 'categoryTask',
    initialState,
    reducers: {
        addCategory: (state, { payload }: { payload: categoryTask }): void => {
            const index = state.findIndex(category => category.name === payload.name);
            if (index === -1 && payload.name !== '') {
                state.push(payload);
            }
            console.log(payload.tasks);
            
        },
        deleteCategory: (state, { payload } : {payload : string}) => {
            const categoryFound = state.find(category => category.name === payload)
            categoryFound &&  state.splice(state.indexOf(categoryFound), 1)
        }
    }
})

export const { addCategory, deleteCategory } = categoryTaskSlice.actions
export default categoryTaskSlice.reducer