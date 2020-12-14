import React, { useReducer, createContext } from 'react';

export const ChestContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_CHEST':
      return { ...state, isOpen: action.payload }
    default:
      return { ...state };
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { isOpen: false })

  return <ChestContext.Provider value={{ state, dispatch }}>
    {children}
  </ChestContext.Provider>
}

export default Provider;