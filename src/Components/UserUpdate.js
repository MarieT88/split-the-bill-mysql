import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
import { useNavigate } from "react-router-dom";


const UserUpdate = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  
  const updateUser = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ username, password, firstName, lastName, email }));
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    navigate("/profile");
  };

  return (
    <div>
      <h2>Update Account</h2>
      <form onSubmit={ updateUser }>
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
        <button>Update Account</button>
      </form>
    </div>
  );
};


export default UserUpdate;
