const appReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, showSidebar: !state.showSidebar };
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

  
  export default appReducer;