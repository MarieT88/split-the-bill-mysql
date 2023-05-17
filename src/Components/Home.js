import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Logout from "./Logout";


const Home = ()=> {
    
  const { auth } = useSelector(state => state);
  
  return (
    <div>
      <div>
        <h3>Welcome { auth.username }!</h3>
      </div>
    </div>
  );
  
};


export default Home;
