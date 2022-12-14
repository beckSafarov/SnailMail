import React, { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FullyCentered from '../../components/FullyCentered'
import LinearLoading from '../../components/LinearLoading'
import axios from 'axios'
import { fullConfig } from '../../utils/rxConfig'
import useAuthContext from '../../hooks/useAuthContext'
import { baseUrl } from '../../constants'

const SignUp = () => {
  const {user:loggedUser, setUser} = useAuthContext()
  const [values, setValues] = useState({ name: ''})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if (loggedUser) navigate('/home')
  }, [loggedUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const isValidated = () => !!values.name

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidated()) return
    setLoading(true)
    try {
      const res = await axios.post(`${baseUrl}/auth`, values, fullConfig)
      setLoading(false)
      const user = res.data.data
      if(user){
        setUser(user)
        navigate('/home')
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  return (
    <>
      <FullyCentered top={'40%'}>
        <h1>Sign up</h1>
        <LinearLoading show={loading} />
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
              Already have an account? Log in <Link to='/login'>here</Link>
            </div>
          </Stack>
        </form>
      </FullyCentered>
    </>
  )
}

export default SignUp
