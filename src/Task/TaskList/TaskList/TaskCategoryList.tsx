import { RootState } from "@/app"
import { filterTasks } from "@/features/tasks"
import { Task } from "@/interfaces"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"




export const TaskCategoryList = () => {

    const tasks = useSelector((state: RootState) => state.tasks)
    const params  = useParams()
    const name = params.name?.toString()    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [tasksCategory, setTasksCategory] = useState<Task[]>(tasks)



    useEffect(() => {
        if (name) {
            const categoryTask: Task[] = tasks.filter(task => task.category === name)
            setTasksCategory(categoryTask)
        }
    }, [name, tasks])

    // ELIMINAR TAREAS DE UNA CATEGORIA

    const handleDeleteTasksCategory = (name: string | undefined ): void => {
        dispatch(filterTasks(name))
        // navigate(-1)
    }


    return (
        <div className="mx-auto w-80 flex flex-col">
            <h2 className="text-center text-xl capitalize">{name}</h2>
            {
                tasksCategory.map((task, i) => (
                    <div key={i} className='outline flex flex-col items-center mt-5'>
                        <p className="capitalize">titulo: {task.title}</p>
                        <p className="capitalize">Description: {task.description}</p>
                        <p className="capitalize">Priority: {task.priority}</p>
                        <p className="capitalize">isCompleted: {task.completed === false ? `False` : `True`}</p>
                        <p className="capitalize">categoria: {task.category}</p>
                        {
                            task.commentary
                            &&
                            <>
                                <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                                    <button className="inline-block  px-6 p-2 first-letter:font-medium text-xs leading-tight uppercase shadow-md  hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-xl transition duration-150 ease-in-out" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                        Comment
                                    </button>
                                </p>
                                <div className="collapse w-full text-center " id="collapseExample">
                                    <div className="block p-2  shadow-lg bg-stone-400">
                                        {task.commentary}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                ))
            }
            <button className="mx-auto bg-white p-1 text-black rounded-xl mt-5" onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => handleDeleteTasksCategory(name)}>Clear All</button>
        </div>
    )
}
