import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'


import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, REGISTRO_ERROR, REGISTRO_EXITOSO, UPDATE_PROFILE } from '../../types'
import AuthContext from './authContext'
import authReducer from './authReducer'


const AuthState = ({ children }) => {

  const initialState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: null,
    cargando: true,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Funciones que cambiaran el state

  const signinFn = async (data) => {
    try {
      const respuesta = await clienteAxios.post('/users/signin', data)
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message
      })
      console.log('state error', error)
    }
  }

  const signupFn = async (data) => {
    try {
      const respuesta = await clienteAxios.post('/users/signup', data)
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.message
      })
    }
  }

  const signoutFn = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }


  const updateProfile = async (datos, token) => {
    try {
      const { data } = await clienteAxios.put('/users/profile', datos, 
        {
           headers: {
             authorization: `Bearer ${token}` 
           }
        }
      )
      dispatch({
        type: UPDATE_PROFILE,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const datos = {
    token: state.token,
    user: state.user,
    error: state.error,
    cargando: state.cargando,
    signinFn,
    signupFn,
    signoutFn,
    updateProfile
  }

  return (
    <AuthContext.Provider value={datos}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthState
