import React, { useState } from 'react';
import { RxUpdate } from 'react-icons/rx';
import { CiCircleRemove } from 'react-icons/ci';

const Demo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteHandler = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateHandler = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <div className='w-screen h-screen bg-slate-200 flex flex-col items-center'>
      <div className='text-4xl p-7'>
        <p>Hi User, Stay productive, stay organized with our Todo app.</p>
      </div>

      <form onSubmit={submitHandler} className='flex w-full max-w-md gap-2 items-center p-3 md:p-0'>
        <input
          type='text'
          value={task}
          className='flex-1 pr-[3rem] pl-[1rem] py-[1rem] rounded-lg outline-none'
          placeholder='Add a new task'
          onChange={(e) => setTask(e.target.value)}
        />
        <button type='submit' className='px-5 py-2 rounded-lg bg-blue-500 text-white'>
          Add
        </button>
      </form>

      <div className='md:w-full max-w-md mt-5 md:p-0'>
        {tasks.map((task, index) => (
          <div className='bg-white p-2 text-xl rounded-lg my-3' key={index}>
            <div className='flex justify-between items-center'>
              <input type='text' className='flex-1 mr-2 outline-none' value={task} onChange={(e) => updateHandler(index, e.target.value)} />
              <div className='flex items-center gap-1 md:gap-3'>
                <button className='p-2 bg-yellow-100 rounded-lg' onClick={() => updateHandler(index, task)}>
                  <RxUpdate />
                </button>
                <button className='p-2 bg-red-300 rounded-lg' onClick={() => deleteHandler(index)}>
                  <CiCircleRemove />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo;
