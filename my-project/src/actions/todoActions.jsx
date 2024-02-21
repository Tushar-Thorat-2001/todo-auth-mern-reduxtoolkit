import axios from "axios";
// import {gettodo,deletetodo} from "../reducer/todoReducer"


// Action of get todo

// export const asyncgettodo = ()=> async(dispatch,getState)=>{
   
//     try{
//         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//         const config = {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };
//        const response = await axios.get("http://localhost:5000/api/todos",config)

//        dispatch(gettodo(response.data));
//     }
//     catch(error){
//         console.log(error)

//     }
// }


// Action  delete todo

// export const asyncdeletetodo = (id)=> async(dispatch,getState)=>{
//     try{
//         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//         const config = {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };
//        const response = await axios.delete("http://localhost:5000/api/todos/id",config)
      

//        dispatch(deletetodo(response.data));
//     }
//     catch(error){
//         console.log(error)

//     }
// }

// // Action of create todo 
// export const createTodo = (user, todo) => async (dispatch) => {
//     try {
//       // Dispatch a synchronous action to set loading state
//       dispatch(addUserRequest());
//       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//       const config = {
//         headers: {
//            Authorization: `Bearer ${userInfo.token}`,
          
//         },
//       };
  
//       const { data } = await axios.post(
//         "http://localhost:5000/api/todos/createtodo",
//         { user, todo },
//         config
//       );
  
//       // Dispatch a synchronous action to update state with received data
//       dispatch(addUserSuccess(data));
//     } catch (error) {
//       // Dispatch a synchronous action to handle errors
//       dispatch(addUserFail(error.message));
//     }
//   };