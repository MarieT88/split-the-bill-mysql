import axios from "axios";


const splits = (state = [], action) => {
  if (action.type === "SET_SPLITS") {
    return action.splits;
  }
  if (action.type === "CREATE_SPLIT") {
    return [...state, action.split];
  }
  if (action.type === "UPDATE_SPLIT") {
    return state.map((split) =>
      split.id === action.split.id ? action.split : split
    );
  }
    if(action.type === 'DELETE_SPLIT'){
    return state.filter(split => split.id !== action.split.id);
  }
  return state;
};


 export const fetchSplits = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/splits");
    dispatch({ type: "SET_SPLITS", splits: response.data });
  };
};

export const createSplit = (split) => {
  return async (dispatch) => {
    const response = await axios.post("/api/splits", split);
    dispatch({ type: "CREATE_SPLIT", split: response.data });
  };
};

export const updateSplit = (id, split) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/splits/${id}`, split);
    dispatch({ type: "UPDATE_SPLIT", split: response.data });
  };
};

export const deleteSplit = (split)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/splits/${split.id}`);
    dispatch({ type: 'DELETE_SPLIT', split});
  };
};


export default splits;