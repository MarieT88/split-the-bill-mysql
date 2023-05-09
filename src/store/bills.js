import axios from "axios";

const bills = (state = [], action) => {
  if (action.type === "SET_BILLS") {
    return action.bills;
  }
  if (action.type === "UPDATE_BILL") {
    return state.map((bill) => {
      if (bill.id === action.bill.id) {
        return action.bill;
      } else {
        return bill;
      }
    });
  }
  if (action.type === "CREATE_BILL") {
    state = [...state, action.bill];
  }
  if(action.type === 'DELETE_BILL'){
    return state.filter(bill => bill.id !== action.bill.id);
  }
  return state;
};


export const fetchBills = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/bills");
    dispatch({ type: "SET_BILLS", bills: response.data });
  };
};

export const updateBill = (bill) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/bills/${bill.id}`, bill);
    dispatch({ type: "UPDATE_BILL", bill: response.data });
  };
};

export const createBill = (bill) => {
  return async (dispatch) => {
    const response = await axios.post("/api/bills", bill);
    dispatch({ type: "CREATE_BILL", bill: response.data });
  };
};

export const deleteBill = (bill)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/bills/${bill.id}`);
    dispatch({ type: 'DELETE_BILL', bill});
  };
};

export default bills;