import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants';


const initialState = {
  loading: false,
  users: [],
  mails: [],
}

//create context
export const MailsContext = createContext(initialState);

const MailsReducer = (state, {type, payload}) => {
  switch (type) {
    case 'loading':
      return {
        ...state, 
        loading: true
      }
    case 'setUsers':
      return {
        ...state,
        loading: false,
        users: payload
      }
    case 'setMails':
      return { ...state, loading: false, mails: payload }
    case 'error':
      return {
        ...state, 
        loading: false, 
        error: payload
      }
    default:
      return state
  }
}

export const MailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MailsReducer, initialState);

  const getUsers = async () => {
    dispatch({ type: 'loading' })
    try {
      const res = await axios.get(`${baseUrl}/users`)
      dispatch({ type: 'setUsers', payload: res.data.data })
    } catch (error) {
      dispatch({ type: 'error', payload: error })
    }
  }
  
  const getMails = async (id) => {
    dispatch({ type: 'loading' })
    try {
      const res = await axios.get(`${baseUrl}/messages/all?user1=${id}`)
      dispatch({ type: 'setMails', payload: res.data.data })
    } catch (error) {
      dispatch({ type: 'error ', payload: error })
    }
  }


  return (
    <MailsContext.Provider value={{
      ...state,
      getUsers,
      getMails
    }}>
      {children}
    </MailsContext.Provider>
  )
}