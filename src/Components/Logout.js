import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';


const Logout = ()=> {
  
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      <br/>
      See you soon { auth.username }!! <button onClick={()=> dispatch(logout())}>Logout</button>
    </div>
  );
  
};


export default Logout;
