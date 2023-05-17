import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store';
import { useNavigate } from 'react-router-dom';
import { attemptLogin } from '../store';


const UserCreate = ()=> {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ errors, setErrors ] = useState([]);

  
  const registerUser = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      username,
      password,
      email,
      firstName,
      lastName
    };

    try {
      await dispatch(register(credentials));
      setErrors([]);
      dispatch(attemptLogin(credentials));
      navigate('/');
    }
    catch(ex){
      setErrors(ex.response.data.error.errors); 
    }

  };
  
  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={ registerUser }>
         <input 
            value={ username } 
            onChange={ ev => setUsername(ev.target.value)} 
            placeholder="username"
            name="username"
          />
          <input 
            value={ password } 
            onChange={ ev => setPassword(ev.target.value)}          
            type="password"
            placeholder="password"
            name="password" 
          />
          <input 
            value={ firstName } 
            onChange={ ev => setFirstName(ev.target.value)}          
            placeholder="first name"
            name="first name" 
          />
          <input 
            value={ lastName } 
            onChange={ ev => setLastName(ev.target.value)}          
            placeholder="last name"
            name="last name" 
          />
          <input 
            value={ email } 
            onChange={ ev => setEmail(ev.target.value)}          
            placeholder="email"
            name="email" 
          />
          <button>Create Account</button>
          <ul>
            {
              errors.map( (error, idx) => {
                return (
                  <li key={ idx }>
                    { error.message }
                  </li>
                );
              })
            }
          </ul>
      </form>
    </div>
  );
};


export default UserCreate;


