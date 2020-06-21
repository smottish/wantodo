import React, { useReducer, createContext } from "react";

const SHOW_TOAST = "SHOW_TOAST";
const HIDE_TOAST = "HIDE_TOAST";

const ToastContext = createContext();

const initialState = {
  show: false,
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        show: true,
        message: action.message,
      };
    case HIDE_TOAST:
      return {
        show: false,
        message: "",
      };
    default:
      return state;
  }
}

const ToastProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  <ToastContext.Provider value={[state, dispatch]}>
    { props.children }
  </ToastContext.Provider>
}

export {
  ToastContext,
  ToastProvider,
  SHOW_TOAST,
  HIDE_TOAST,
}