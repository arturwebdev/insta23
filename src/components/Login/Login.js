import React, { useEffect, useRef } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, selectUsers } from '../../store/slices/users/usersSlice'
import { fetchUsers } from '../../store/slices/users/usersAPI'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const { usersData, currentUser } = useSelector(selectUsers)
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (!usersData.length) {
      dispatch(fetchUsers())
    }
  }, [])

  const logRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const [{value: email}, {value: password}] = logRef.current;
    dispatch(logIn({email, password}))

    logRef.current.reset()
  }

  return (

  <div id="wrapper">
    <div className="main-content">
      <div className="header">
        <img src="https://i.imgur.com/zqpwkLQ.png" />
      </div>
      <div className="l-part">
        <form ref={logRef} onSubmit={handleSubmit}>
            <input defaultValue={'bret'} type="text" name='email' placeholder="Username" className="input-1" />
            <div className="overlap-text">
            <input defaultValue={'gwenborough'} type="password" name='password' placeholder="Password" className="input-2" />
            <a href="#">Forgot?</a>
            </div>
            <button className="btn">Log in</button>
        </form>
      </div>
    </div>
    <div className="sub-content">
      <div className="s-part">
        Don't have an account?<a href="#">Sign up</a>
      </div>
    </div>
  </div>

  )
}

export default Login