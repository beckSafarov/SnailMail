import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FullyCentered from '../../components/FullyCentered'
import LinearLoading from '../../components/LinearLoading'
import { fullConfig } from '../../utils/rxConfig'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import useAuthContext from '../../hooks/useAuthContext'
import AlertBox from '../../components/AlertBox'
import { baseUrl } from 'src/constants'

const LoginScreen = () => {
  const {user:loggedUser, setUser} = useAuthContext()
  const [values, setValues] = useState({name: ""})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{
    if(loggedUser) navigate('/home')
  }, [loggedUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!values.name) return
    setLoading(true)
    try{
      const res = await axios.post(`${baseUrl}/auth/login`, values, fullConfig)
      setLoading(false)
      const user = res.data.data
      if(user){
        setUser(user)
        navigate('/home')
      }
    }catch(error){
      setLoading(false)
      console.error(error)
      setError(error.response.data.message)
    }
  }

  return (
    <FullyCentered top={'40%'}>
      <h1>Log in</h1>
      <LinearLoading show={loading}/>
      <AlertBox>{error}</AlertBox>
      <form onSubmit={handleSubmit} style={{ minWidth: '500px' }}>
        <Stack direction='column' spacing={3}>
          <TextField
            onChange={handleChange}
            value={values.name}
            name={'name'}
            type='text'
            label={'Name'}
            variant='standard'
            required
          />
          <Button
            type='submit'
            variant='contained'
            style={{ width: '100%', marginTop: '40px' }}
          >
            Submit
          </Button>
          <div>
            Do not have an account yet? Sign up <Link to='/signup'>here</Link> 
          </div>
        </Stack>
      </form>
    </FullyCentered>
  )
}

export default LoginScreen
