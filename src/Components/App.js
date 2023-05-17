import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import Logout from './Logout';
import Login from './Login';
import UserProfile from "./UserProfile";
import BillCreate from './BillCreate';
import BillList from "./BillList";
import Split from "./Split";
import BillSplit from "./BillSplit";
import Home from "./Home";
import { loginWithToken, fetchUsers, fetchSplits, fetchBills } from '../store';


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
      dispatch(fetchUsers());
      dispatch(fetchBills());
      dispatch(fetchSplits());
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
      <div className="jumbotron text-center">
        <h1>Split the Bill</h1>
      </div>
      {
        !!auth.id  && (
          <div>
            <nav className="navbar navbar-inverse">
              <div className="navbar-header">
                <a className="navbar-brand">SplitTheBill</a>
              </div>
              <Link to="/profile" className="nav navbar-nav">Profile</Link>
              <Link to="/newbill" className="nav navbar-nav">New Bill</Link>
              <Link to="/mybills" className="nav navbar-nav">My Bills</Link>
              <Link to="/splits" className="nav navbar-nav">Shared Bills</Link>
            </nav>
          </div>
        )
      }
      {
        !!auth.id && (
          <div>
            <Routes>
             <Route path="/profile" element={<UserProfile />} />
             <Route path="/newbill" element={<BillCreate />} />
             <Route path="/mybills" element={<BillList />} />
             <Route path="/bills/:id" element={<BillSplit />} />
             <Route path="/splits" element={<Split />} />
             <Route path="/" element={<Home/>} />
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
