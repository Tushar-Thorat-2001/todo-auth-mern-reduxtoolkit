import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    todo: [],
  };

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    gettodo:(state, actions) => {
        state.todo =  actions.payload
      },

    addtodo: (state, actions) => {
      state.todo.push(actions.payload);
    },

    updatetodo: (state, actions) => {
      const index = state.todo.findIndex((x) => x._id === actions.payload._id);
      state.todo[index] = {
        _id: actions.payload._id,
        todo: actions.payload.todo,
      };
    },

    emptytodo:(state,actions)=>{
      state.todo = [];

    },

    deletetodo: (state, actions) => {
      state.todo.splice(actions.payload, 1);
      // const index = state.todo.findIndex((x) => x._id === actions.payload._id);
      // state.todo.splice(index,1)
    },
  },
});

export const { addtodo, deletetodo, gettodo, updatetodo,emptytodo } = todoSlice.actions;

export default todoSlice.reducer;
