import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = JSON.parse(localStorage.getItem('appState')) || {
  userInfo: {},
  showSidebar: true
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, showSidebar: !state.showSidebar };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  const setUserInfo = userInfo => {
    dispatch({ type: 'SET_USER_INFO', payload: userInfo });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <AppContext.Provider value={{ ...state, setUserInfo, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export { AppProvider };
