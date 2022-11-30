import React, { createContext, useReducer } from 'react'
import { clearStore, getStore, setStore } from '../utils/lcs.js'


const initialState = {
  user: getStore('user') || undefined
}

//create context
export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      setStore('user', action.payload)
      return { user: action.payload }
    case 'clearUser':
      clearStore('user')
      return { user: undefined }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = (user) =>{
    dispatch({
      type: "setUser",
      payload: user
    })
  }
  
  const clearUser = () => {
    dispatch({ type: "clearUser" })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      setUser,
      clearUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}