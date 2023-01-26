import { Route, Routes } from 'react-router-dom'
import './App.css'
import { TaskForm, TaskList } from './Task'
import 'tw-elements'
import { TaskCategoryList } from './Task/TaskList/TaskList/TaskCategoryList'



function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/create-task' element={<TaskForm />} />
        <Route path={'/edit-task/:id'} element={<TaskForm />} />
        <Route path={'/category-task/:name'} element={<TaskCategoryList />} />
        <Route path={'*'} element={<h1>Error</h1>} />
      </Routes>
    </div>
  )
}

export default App
