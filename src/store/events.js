import axios from "axios";

const events = (state = [], action) => {
  if (action.type === "SET_EVENTS") {
    return action.events;
  }
  if (action.type === "UPDATE_EVENT") {
    return state.map((event) => {
      if (event.id === action.event.id) {
        return action.event;
      } else {
        return event;
      }
    });
  }
  if (action.type === "CREATE_EVENT") {
    state = [...state, action.event];
  }
  if(action.type === 'DELETE_EVENT'){
    return state.filter(event => event.id !== action.event.id);
  }
  return state;
};


export const fetchEvents = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/events");
    dispatch({ type: "SET_EVENTS", events: response.data });
  };
};

export const updateEvent = (event) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/events/${event.id}`, event);
    dispatch({ type: "UPDATE_EVENT", event: response.data });
  };
};

export const createEvent = (event) => {
  return async (dispatch) => {
    const response = await axios.post("/api/events", event);
    dispatch({ type: "CREATE_EVENT", event: response.data });
  };
};

export const deleteEvent = (event)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/events/${event.id}`);
    dispatch({ type: 'DELETE_EVENT', event});
  };
};

export default events;