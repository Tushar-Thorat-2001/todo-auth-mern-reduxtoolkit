import React,{useEffect} from 'react'
import { Link,Route,Routes,useNavigate } from 'react-router-dom'
import Todo from './pages/Todo'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Demo from './pages/Demo'
import { useSelector, useDispatch } from 'react-redux'
import {logoutUser} from "./actions/userActions"
import { setUserInfo } from './reducer/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const userLogin = useSelector((state) => state.auth);
  const { loading, error, userInfo } = userLogin; 

  const userInfoFromLocalStorage = localStorage.getItem('userInfo');
  useEffect(() => {
    if (userInfoFromLocalStorage) {
      // Dispatch action to set user information in Redux store
      dispatch(setUserInfo(JSON.parse(userInfoFromLocalStorage)));
    }
  }, []);


  const handleSignout = ()=>{
    dispatch(logoutUser());
    nav("/")
  }

  return (
    <div className='w-full h-full overflow-hidden'>
      <nav className='p-5 px-[2rem] md:px-[5rem] text-xl font-semibold flex justify-between items-center'>
        <Link to="/ ">
        TodoWorks
        
        </Link>
        
        {userInfoFromLocalStorage ? (
          <Link onClick={handleSignout}>Sign Out</Link>
        ) : (
          <Link to='/signin'>Sign In</Link>
        )}


      </nav>




      <Routes>
 
  {userInfoFromLocalStorage ? (
    <Route path="/" element={<Todo />} />
  ) : (
    <Route path="/" element={<Demo />} />
  )}
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>


    </div>
  )
}

export default App