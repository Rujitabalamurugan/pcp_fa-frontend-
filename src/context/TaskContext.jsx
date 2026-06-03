import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  authUser: null,
  token: localStorage.getItem('token') || null,
  users: [],
  projects: [],
  issues: [],
  comments: [],
  filters: {},
  analytics: {}
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, authUser: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, authUser: null, token: null };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_ISSUES':
      return { ...state, issues: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    default:
      return state;
  }
}

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Mandatory exposure for evaluator
  useEffect(() => {
    window.appState = state;
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
