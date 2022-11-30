import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants';
import { fullConfig } from '../utils/rxConfig';


const initialState = {
  success: false,
  loading: false,
  users: [],
  mails: {},
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
    case 'sendMail':
      const recipientArr = state.mails[payload.recipient]
      const arr = recipientArr ? [...recipientArr, payload] : [payload]
      return {
        ...state,
        loading: false,
        success: true,
        mails: {
          ...state.mails,
          [payload.recipient]: arr
        }
      }
    case 'error':
      return {
        ...state, 
        loading: false, 
        error: payload
      }
    case 'inbox':
      const inboxData = payload.data
      const handleMailFromStranger = (mail)=>{
        return {
          ...state,
          mails: {
            ...state.mails,
            [mail.sender]: [mail]
          }
        }
      }
      for (const mail of inboxData) {
        if (!state.mails[mail.sender]){
          return handleMailFromStranger(mail)
        }
        const currMails = state.mails[mail.sender]
        const haveIt = currMails?.find?.((m => m._id === mail._id))
        const updatedMails = currMails?.concat?.(mail)
        if(currMails && !haveIt){
          return {
            ...state,
            mails: {
              ...state.mails,
              [mail.sender]: updatedMails
            }
          }
        }
      }
      return state
    case 'resetState':
      
      return {
        ...state, 
        [payload.prop]:payload.value
      }
    case 'resetEverything':
      console.log('resetting everything')
      return initialState
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
  
  const sendMail = async (content) => {
    dispatch({ type: 'loading' })
    try {
      const res = await axios.post(`${baseUrl}/messages`, content, fullConfig)
      dispatch({ type: 'sendMail', payload: res.data.data })
    } catch (error) {
      dispatch({ type: 'error ', payload: error })
    }
  }
  
  const checkInbox = async (_id) => {
    dispatch({ type: 'loading' })
    try {
      const res = await axios.get(`${baseUrl}/messages/inbox?recipient=${_id}`)
      dispatch({ type: 'inbox', payload: { data: res.data.data} })
    } catch (error) {
      dispatch({ type: 'error ', payload: error })
    }
  }

  

  const resetState = (prop, value = false) => {
    dispatch({
      type: 'resetState',
      payload: { prop, value }
    })
  }
  const resetEverything = () => {
    dispatch({type: 'resetEverything'})
  }


  return (
    <MailsContext.Provider value={{
      ...state,
      getUsers,
      getMails,
      sendMail,
      checkInbox,
      resetState,
      resetEverything
    }}>
      {children}
    </MailsContext.Provider>
  )
}