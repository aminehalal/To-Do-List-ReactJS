import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [tasks , setTasks] = useState([]);
  const newTask = useRef();

  const handleAddTask = () => {
    const task = newTask.current.value ;
    if (task !== ""){
      const currentDate = new Date();
  
      const currentTime = currentDate.toLocaleTimeString();
      const theTask = {
        completed : false ,
        time : currentTime ,
        text : task
      }
      setTasks([...tasks , theTask]);
      newTask.current.value = '';
    }
  }

  const handleTaskDone = (index) => {
    const copyTask = [...tasks];
    copyTask[index].completed = !copyTask[index].completed;
    setTasks(copyTask);
  }

  const handleDeleteTask = (index) => {
    const copyTask = [...tasks];
    copyTask.splice(index , 1);
    setTasks(copyTask);
  }
  return (
    <div className="font-kanit text-white">
      <div className='flex flex-col justify-center items-center p-5 m-1'>
        <h1 className='text-6xl m-9 font-extrabold font-kanit'>To <span className='text-cyan-400'>Do</span> List</h1>
        <div className='flex flex-col justify-center items-center'>
          <ul className='font-bold text-slate-200 p-4'>
            {tasks.map(({completed ,time, text}, index) => {
              return (
                <div key={index} className='flex justify-between items-center m-1 my-2'>
                  <li onClick={() => handleTaskDone(index)} className={`cursor-pointer list-none hover:list-disc hover:list-inside w-48 sm:w-80 md:w-96 break-words p-1 ${completed ? 'line-through' : ''}`}>{text}</li>
                  <span className='p-2 text-xs text-cyan-400'>{time}</span>
                  <span onClick={()=>handleDeleteTask(index)} className='text-cyan-400 p-1 border-2 border-cyan-400 rounded-lg hover:border-red-500 hover:text-red-500 duration-700 cursor-pointer'>Delete</span>
                </div>
              );
            })}    
          </ul>
          <input type='text' ref={newTask} className='border-2 border-cyan-400 rounded-lg p-1 m-2 bg-transparent font-bold text-black focus:bg-slate-100' />
          <button onClick={handleAddTask} className='hover:font-bold duration-500 text-xl'>Add <span className='text-cyan-400'>Task</span></button>
        </div>
      </div>
    </div>
  );
}

export default App;
