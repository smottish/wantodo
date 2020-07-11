import React, { useReducer, createContext } from "react";

const CREATE_WANT_REQUEST = "CREATE_WANT_REQUEST";
const CREATE_WANT_RECEIVED = "CREATE_WANT_RECEIVED";
const CREATE_WANT_FAILED = "CREATE_WANT_FAILED";

const WantsContext = createContext();

const initialState = {
  wants: [],
  lastCreated: null,
  lastError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_WANT_REQUEST:
      // For now, do nothing, but may want to update state in the future
      return state;
    case CREATE_WANT_RECEIVED:
      return {
        ...state,
        lastCreated: { ...action.want },
      };
    case CREATE_WANT_FAILED:
      return {
        ...state,
        lastError: { ...action.error },
      };
    default:
      return state;
  }
}

const WantsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ToastContext.Provider value={[state, dispatch]}>
      { props.children }
    </ToastContext.Provider>
  )
}

export {
  WantsContext,
  WantsProvider,
  CREATE_WANT_REQUEST,
  CREATE_WANT_RECEIVED,
  CREATE_WANT_FAILED,
}