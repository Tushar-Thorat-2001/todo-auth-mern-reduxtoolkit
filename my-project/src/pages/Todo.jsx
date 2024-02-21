import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RxUpdate } from 'react-icons/rx';
import { CiCircleRemove } from 'react-icons/ci';
import {addtodo,deletetodo,gettodo, updatetodo} from '../reducer/todoReducer';

import axios from 'axios';

const Todo = () => {
  const user = useSelector((state) => state.auth);
  const { todo } = useSelector((state) => state.todo);

  const dispatch = useDispatch();
  const { loading, error, userInfo } = user;

  const [Todo, setTodo] = useState('');
  const [UpdateTodo, setUpdateTodo] = useState('');
  const [Update, setUpdate] = useState(null);


  
const handleUpdate = (id, index) =>{
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  axios
      .post(`http://localhost:5000/api/todos/${id}`, {todo: UpdateTodo }, config)
      .then((res) => {
        
        dispatch(updatetodo(res.data));
        
      })
      .catch((err) => {
        console.log(err);
      });

  setUpdate(index)
  setUpdateTodo("")

}

  const handleCreate = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .post('http://localhost:5000/api/todos/createtodo', { user: userInfo._id, todo: Todo }, config)
      .then((res) => {
        const newtodo = res.data;
        dispatch(addtodo(newtodo));
        setTodo('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/todos', config);
        dispatch(gettodo(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[dispatch,userInfo]);

  const handleDelete = (id,index) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .delete(`http://localhost:5000/api/todos/${id}`, config)
      .then((res) => {
        dispatch(deletetodo(index));
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className='w-screen h-screen bg-slate-200 flex flex-col items-center'>
      <div className='text-4xl p-7'>
        <p>Hi { userInfo.name }, Stay productive, stay organized with our Todo app.</p>
      </div>

      <form onSubmit={handleCreate} className='flex w-full max-w-md gap-2 items-center p-3 md:p-0'>
        <input
          type='text'
          value={Todo}
          className='flex-1 pr-[3rem] pl-[1rem] py-[1rem] rounded-lg outline-none'
          placeholder='Add a new task'
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type='submit' className='px-5 py-2 rounded-lg bg-blue-500 text-white'>
          Add
        </button>
      </form>

      <div className='md:w-full max-w-md mt-5 md:p-0'>
      {todo.map((todo, index) => {
  return (
    <div className='bg-white p-2 text-xl rounded-lg my-3' key={`${index}-${todo._id}`}>
    
      <div className='flex justify-between items-center'>
        
        {Update == index?(
          <>
           <input type='text' className='flex-1 mr-2 outline-none' value={UpdateTodo}  onChange={(e) => setUpdateTodo(e.target.value)}/>
        <div className='flex items-center gap-1 md:gap-3'>
          <button className='p-1 bg-yellow-100 rounded-lg'  onClick={() => handleUpdate(todo._id) }>
            Save
          </button>
        
        </div>
         
          </>
        ):(
          <>
            <input type='text' className='flex-1 mr-2 outline-none' value={todo.todo} />
        <div className='flex items-center gap-1 md:gap-3'>
          <button className='p-2 bg-yellow-100 rounded-lg'  onClick={() => setUpdate(index)}>
            <RxUpdate />
          </button>
          <button className='p-2 bg-red-300 rounded-lg' onClick={() => { handleDelete(todo._id,index) }}>
            <CiCircleRemove />
          </button>
        </div>
           
          </>
        )}
       
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
};

export default Todo;
