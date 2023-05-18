import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCreate from './UserCreate';

const Login = ()=> {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate(`/`);
  };
  
  return (
    <div>
      <div className="container mt-3">
        <h2>Login</h2>
        <form onSubmit={ login }>
          <div className="row">
          <div className="col">
          <input
            placeholder='username'
            value = { credentials.username }
            name = 'username'
            onChange = { onChange }
            />
            </div>
            <div className="col">
          <input
            placeholder='password'
            name = 'password'
            value={ credentials.password }
            onChange = { onChange }
          />
          </div>
          <div className="col">
          <button>Login</button>
          </div>
          </div>
        </form>
      </div>
      <div>
        <br/>
        <UserCreate />
      </div>
    </div>
  );
};


export default Login;
