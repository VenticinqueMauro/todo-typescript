import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "@/features/tasks/taskSlice";
import categoryTasReducer from "@/features/tasks/categoryTaskSlice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        categoryTask: categoryTasReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch