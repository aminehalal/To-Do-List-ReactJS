import { useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

const reducer = (state , action) => {
  switch(action.type){
    case 'FETCH_SUCCESS' :
      case 'FETCH_SUCCESS':
        const tasksWithDefaultTime = action.payload.todos.map(task => ({
          ...task,
          time: task.time ? task.time : "00:00:00 2024/01/01"
        }));
        return { ...state, loading: false, tasks: tasksWithDefaultTime};    
    case 'ADD_TODO':
      return {...state , tasks:[...state.tasks , action.payload] , error :[]};
    case 'TOGGLE_COMPLETED':
      return {...state , tasks:action.payload}
    case 'DELETE_TODO' : 
        return {...state , tasks:action.payload}
    case 'ERROR_TYPING':
      return {...state , error:[...state.error , action.payload]}
    case 'FETCH_ERROR' :
      return {...state , error: [action.payload]}
    default:
      return state
  }
}

const initialState = {
  tasks: [],
  loading: true,
  error: [],
};

function App() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://dummyjson.com/todos');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchData();
  }, []);

  const [taskState , dispatch] = useReducer(reducer , initialState);



  const newTask = useRef();

  const handleAddTask = () => {
    const newTodo = newTask.current.value ;
    if(newTodo !== ''){
      const thetask = {
        id:  taskState.tasks.length + 1 ,
        todo : newTodo,
        time : new Date().toLocaleString(),
        completed : false
      }
      dispatch({type: "ADD_TODO" , payload:thetask})
      newTask.current.value = '';
    }
    else{
      console.log(taskState)
      dispatch({type:"ERROR_TYPING" , payload:"You can't add an empty task"})
    }
  }

  const handleTaskDone = (id) => {
    const updatedTasks = taskState.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    dispatch ({type:'TOGGLE_COMPLETED' , payload:updatedTasks})
  }

  const handleDeleteTask = (id) => {

    const updatedTasks = taskState.tasks.filter( task => task.id !== id)
    dispatch ({type:'DELETE_TODO' , payload:updatedTasks})

  }
  
  return (
    <div className="font-kanit text-white">
      <div className='flex flex-col justify-center items-center p-5 m-1'>
        <h1 className='text-7xl m-9 font-extrabold font-kanit'>To <span className='text-cyan-400'>Do</span> List</h1>
        <div className='flex flex-col justify-center items-center'>
          <ul className='font-bold text-slate-200 p-4'>
          {taskState.loading ? (
            <div>
            <h1 className='text-3xl font-bold'>
            Please <span className='text-cyan-400'> Wait</span>
            </h1>
            </div>
          ) : (
            taskState.tasks.map(({id ,todo , time,completed}) => {
              return (
                <div key={id} className='flex justify-between items-center m-1 my-2'>
                  <li onClick={() => handleTaskDone(id)} className={`cursor-pointer list-none hover:list-disc hover:list-inside w-48 sm:w-80 md:w-96 break-words p-1 ${completed ? 'line-through' : ''}`}>{todo}</li>
                  <span className='p-2 text-xs text-cyan-400'>{time}</span>
                  <span onClick={()=>handleDeleteTask(id)} className='text-cyan-400 p-1 border-2 border-cyan-400 rounded-lg hover:border-red-500 hover:text-red-500 duration-700 cursor-pointer'>Delete</span>
                </div>
              );
            })  
          )}
          </ul>

          <ul className='font-bold text-red-500'>
          {
            taskState.error && taskState.error.length > 0 ? (
              taskState.error.map((error , index) => (
                <div key={index} className='flex justify-center items-center m-1 my-2'>
                  <li className='list-none w-48 sm:w-80 md:w-96 break-words p-1'>{error}</li>
                </div>
              ))
            ) : null
          }

          </ul>
          <input type='text' ref={newTask} className='border-2 border-cyan-400 rounded-lg p-1 m-2 bg-transparent font-bold text-black focus:bg-slate-100' />
          <button onClick={handleAddTask} className='hover:font-bold duration-500 text-xl'>Add <span className='text-cyan-400'>Task</span></button>
        </div>
      </div>
    </div>
  );
}

export default App;
