import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.auth);
  const { loading, error, userInfo } = userLogin; // Destructure userInfo from userLogin

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    // Check if user is logged in, then navigate to "/"
    if (userInfo && userInfo.token) {
      navigate("/");
    }
  }, [userInfo, navigate]); // Run the effect when userInfo or navigate changes

  return (
    <div className="bg-grey-lighter h-full my-[5%]  flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Create an Account?{' '}
          <Link to="/signup" className="no-underline border-b border-blue text-blue">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
