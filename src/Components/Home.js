import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';


const Home = ()=> {
  
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      Welcome { auth.username }!! <button onClick={()=> dispatch(logout())}>Logout</button>
    </div>
  );
  
};


export default Home;
