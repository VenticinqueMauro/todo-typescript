import { RootState } from '@/app';
import { addTask, editTask } from '@/features/tasks/taskSlice';
import { Task } from '@/interfaces';
import { getRandomNumber } from '@/utilities';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const TaskForm: React.FC = () => {


	const tasks = useSelector((state: RootState) => state.tasks)
	const categoryTask = useSelector((state: RootState) => state.categoryTask)
	
	const dispatch = useDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const [task, setTask] = useState<Task>({
		title: '',
		description: '',
		id: getRandomNumber(1, 10000),
		priority: 'None',
		category: '',
		completed: false,
	})

	useEffect(() => {

		if (params.id) {
			const selectedTask = tasks.find(task => task.id === Number(params.id))
			if (selectedTask) {
				setTask(selectedTask)
			}
		}
	}, [])

	// CAPTURAR CAMBIOS EN LOS CAMPOS DE LAS TAREAS

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setTask({
			...task,
			[e.target.name]: e.target.value.toLowerCase(),
		})
	}

	// CREAR TAREA

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (params.id) {
			dispatch(editTask(task)
			)
		} else {
			dispatch(addTask(task))
		}
		navigate('/')
	}


		
	return (
		<>
			<h2 className='text-center text-2xl'>Create Task</h2>
			<form className='flex flex-col w-52 mx-auto mt-2' onSubmit={handleSubmit}>
				<div className='flex gap-3 justify-center items-start'>
					<div className='flex flex-col justify-center items-start'>
						<input className='mt-1 rounded-sm p-1 text-black' required name='title' placeholder='Title' onChange={handleChange} value={task.title} />
						<textarea className='mt-1 rounded-sm p-1 text-black w-full resize-none' required name='description' placeholder='Description' onChange={handleChange} value={task.description}  />
						<div className='flex justify-between'>
							<label >Priority: {task.priority !== 'None' && task.priority}</label>
							<select className='bg-black ' name='priority' onChange={handleChange}  >
								<option value='None'>None</option>
								<option value='Low'>Low</option>
								<option value='Medium'>Medium</option>
								<option value='Hight'>Hight</option>
							</select>
						</div>
					</div>
					<div className='flex flex-col justify-center items-start'>

						<select className='bg-black ' name='category' onChange={handleChange} >
							<option value='None'>Category</option>
								{
									categoryTask.map((category, i) => (
										<option className='capitalize' key={i} value={category.name}>
											{category.name.toLocaleLowerCase()}
										</option>
									))
								}
							</select>
						<textarea className='mt-1 rounded-sm p-1 text-black w-full '  name='commentary' placeholder='Commetary(optional)' onChange={handleChange} value={task.commentary} maxLength={50} />
					</div> 
				</div>
				<button className='text-black bg-white mt-1 w-full mx-auto rounded-lg'>
					Save
				</button>
			</form>
		</>
	);
};

export default TaskForm;
