import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { createBill } from '../store';
import { useNavigate } from 'react-router-dom';
import UserBills from './UserBills';


const BillCreate = ()=> {
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ name, setName ] = useState('');
  const [ amount, setAmount ] = useState(0.0);
  const [ dueDate, setDueDate ] = useState(null);
  const [ note, setNote ] = useState('');
  const [ errors, setErrors ] = useState([]);

  
  const handleDateChange = (date) => {
    setDueDate(date);
  };
  
  const create = async(ev) => {
    ev.preventDefault();
    try{
      await dispatch(createBill({ name, amount, dueDate, note }, auth.id));
      setName('');
      setAmount('');
      setDueDate(null);
      setNote('');
      setErrors([]);
      navigate('/bills');
    }
    catch(ex){
      if (ex.response && ex.response.data && ex.response.data.error && ex.response.data.error.errors) {
        setErrors(ex.response.data.error.errors);  
      } else {
        setErrors([{ message: 'An error occurred' }]);
        console.log(ex);
      }
    }

  };  



  return (
    
    <div>
      <UserBills />
      <h2>Create Bill</h2>
      <form onSubmit={ create }>
        <input 
          type="text" 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          placeholder="bill"
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(event) => setAmount(event.target.value)}
          placeholder="amount"
        />
        <textarea 
          value={note} 
          onChange={(event) => setNote(event.target.value)} 
          placeholder="note"
        />
        <span>Due Date
        <DatePicker 
          id="dueDate" 
          selected={dueDate} 
          onChange={handleDateChange} 
          dateFormat="yyyy-MM-dd"
          placeholder="due date"
        /></span>
        <button type="submit">Create Bill</button>
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


export default BillCreate;


