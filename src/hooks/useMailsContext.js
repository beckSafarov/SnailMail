import { MailsContext } from '../context/MailsContext'
import { useContext } from 'react'

const useMailsContext = () => useContext(MailsContext)

export default useMailsContext