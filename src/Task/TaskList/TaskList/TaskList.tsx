import { RootState } from '@/app';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll, deleteTask } from '@/features/tasks';
import { Link } from 'react-router-dom';
import { setItem } from '@/utilities/localStorage';
import ToolTip from '@/components/Tooltip';
import { addCategory, deleteCategory } from '@/features/tasks/categoryTaskSlice';



const TaskList: React.FC = () => {


	const tasks = useSelector((state: RootState) => state.tasks)
	const categoryTask = useSelector((state: RootState) => state.categoryTask)
	const dispatch = useDispatch()

	const [loader, setLoader] = useState<Boolean>(true)

	useEffect(() => {
		setItem('tasks', tasks)
		setTimeout(() => {
			setLoader(false)
		}, 300)
	}, [tasks])

	// ELIMINAR TAREA DE FORMA INDIVIDUAL

	const handleDelete = (id: number) => {
		dispatch(deleteTask(id))
	}

	// ELIMINAR TODAS LAS TAREAS

	const handleDeleteAll = () => {
		dispatch(deleteAll())
	}

	// AGREGADO DE CATEGORIAS

	const handleAddCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault()
		dispatch(addCategory({
			...categoryTask,
			name: e.target.value.toLowerCase()
		})
		)
	}

	// ELIMINAR CATEGORIA

	const handleDeleteCategory = (name: string) => {
		const filteredTask = tasks.filter(task => task.category === name)
		if (filteredTask.length <= 0) {
			dispatch(deleteCategory(name))
		} else {
			console.log('No se puede eliminar categoria ya que contiene tareas en su interior');
		}
	}


	return (
		<div className='text-center mt-5'>
			<h1>Listado de Tareas</h1>
			<hr className='w-52 mx-auto m-2' />
			<div className='flex justify-center gap-3 m-3 items-center'>
				{
					categoryTask.map((category, i) => (
						<div key={i} className='relative'>
							<Link to={`/category-task/${category.name}`} className='bg-white text-black p-1 rounded-lg capitalize' >{category.name}</Link>
							<span className="absolute cursor-pointer -top-2 -right-2 text-sm inline-block h-4 w-4 leading-none text-center rounded-full whitespace-nowrap align-baseline font-bold bg-red-400 text-white rounded"
								onClick={() => handleDeleteCategory(category.name)}
							>-</span>


						</div>
					))
				}
				<div className='flex flex-col'>
					<p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
						<button className='text-sm text-white p-1 text-center' type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
							Add Category
						</button>
					</p>
					<div className="collapse w-32 text-center flex flex-col" id="collapseExample">
						<div className="block p-2  shadow-lg ">
							<input className='text-black w-32' type="text" onBlur={handleAddCategory} />
						</div>
					</div>

				</div>
			</div>
			<hr className='w-52 mx-auto m-2' />
			{loader
				?
				<div>Cargando...</div>
				:
				<>
					<Link to='/create-task' className='bg-white text-black p-1 rounded-lg'>Create Task</Link>
					<ul className='flex gap-4 justify-center flex-wrap'>
						{tasks.map(task => (
							<li key={task.id} className='w-52 mt-5 mx-auto outline'>
								<div className='flex mx-auto justify-center w-52'>
									<div className='flex flex-col justify-center items-center'>
										<p>{task.category && `Category: ${task.category}`}</p>
										<p>Title: {task.title}</p>
										<p>Description: {task.description}</p>
										<p>{task.priority === 'None' ? `No priority` : `Priority: ${task.priority}`}</p>
										{/* <button type="button" className="px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out " data-bs-toggle="tooltip" data-bs-placement="bottom" title={task.commentary}>
											Comment
										</button> */}
										<ToolTip tooltip={task.commentary}>
											{task.commentary && <p>Comment</p>}
										</ToolTip>
									</div>
								</div>
								<div className=''>
									<Link className='bg-white border-slate-800 text-black text-sm p-1 mx-1 rounded-lg' to={`/edit-task/${task.id}`}>Edit</Link>
									<button className='bg-white border-slate-800 text-black text-sm p-1 mx-1 rounded-lg'
										onClick={() => handleDelete(task.id)}
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
					<button className='bg-white border-slate-800 text-black text-sm p-1 mt-10 mx-1 rounded-lg' onClick={handleDeleteAll}>Delete All</button>
				</>
			}
		</div>
	);
};

export default TaskList;
