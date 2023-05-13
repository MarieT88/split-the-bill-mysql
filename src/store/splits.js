import axios from "axios";


const splits = (state = [], action) => {
  if (action.type === "SET_SPLITS") {
    return action.splits;
  }
  if (action.type === "CREATE_SPLIT") {
    state = [...state, action.split];
  }
  if (action.type === "UPDATE_SPLIT") {
    return state.map((split) =>
      split.id === action.split.id ? action.split : split
    );
  }
  /*
  if (action.type === "UPDATE_SPLIT") {
  const { split } = action;
  if (!split) return state;
  return state.map((s) =>
    s.id === split.id ? split : s
  );
}*/
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

/*export const updateSplit = (id, split) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/splits/${id}`, split);
    dispatch({ type: "UPDATE_SPLIT", split: response.data });
  };
};/

export const updateSplit = (billId, splitId, split) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/bills/${billId}/splits/${splitId}`, split);
    dispatch({ type: "UPDATE_SPLIT", split: response.data });
  };
};*/


export default splits;