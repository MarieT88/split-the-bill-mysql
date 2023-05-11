import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import Logout from './Logout';
import Login from './Login';
import UserProfile from "./UserProfile";
import UserBills from "./UserBills";
import BillCreate from './BillCreate';
import BillList from "./BillList";
import { loginWithToken } from '../store';


const App = ()=> {
  
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const prevAuth = useRef(auth);

  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);
  
  useEffect(()=> {
    if(!prevAuth.current.id && auth.id){
      console.log(`${auth.firstName} is logged in`);
    }
    if(prevAuth.current.id && !auth.id){
      console.log('logged out');
    }
  }, [auth]);
  
  useEffect(()=> {
    prevAuth.current = auth;
  });

  return (
    <div>
      <h1>Split the Bill</h1>
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to="/profile">Profile</Link>
              <Link to="/bills">Bills</Link>
            </nav>
          </div>
        )
      }
      {
        !!auth.id && (
          <div>
            <Routes>
             <Route path="/profile" element={<UserProfile />} />
             <Route path="/bills/*" element={<UserBills />} />
             <Route path="/newbill" element={<BillCreate />} />
             <Route path="/mybills" element={<BillList />} />
            </Routes>
          </div>
        )
      }
      {
        auth.id ? <Logout /> : <Login />
      }
    </div>
  );
};


export default App;
