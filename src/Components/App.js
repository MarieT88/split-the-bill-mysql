import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import UserProfile from "./UserProfile";
import UserBills from "./UserBills";
import UserEvents from "./UserEvents";
import Data from "./Data";
import { loginWithToken } from '../store';


const App = ()=> {
  
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>Split the Bill</h1>
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/bills">Bills</Link>
              <Link to="/events">Events</Link>
              <Link to="/data">Data</Link>
            </nav>
          </div>
        )
      }
      {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id && (
          <div>
            <Routes>
             <Route path="/profile" element={<UserProfile />} />
             <Route path="/bills" element={<UserBills />} />
             <Route path="/events" element={<UserEvents />} />
             <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        )
      }
    </div>
  );
};


export default App;
