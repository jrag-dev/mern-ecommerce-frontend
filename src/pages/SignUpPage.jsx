import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';




const initialState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

const SignUpPage = () => {

  let navigate = useNavigate()

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // const { user, error, message, signupFn } = useContext(AuthContext)
  const { signupFn } = useContext(AuthContext)

  let error = null
  let user = {}

  const [dataForm, setDataForm] = useState(initialState)



  const handlerChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value 
    })
  }

  const handlerSubmit = e => {
    e.preventDefault()

    // validaciones
    if (dataForm.password.trim() !== dataForm.confirm.trim()) {
      toast('Los password no coinciden!')
      return;
    }

    // pasamos al action
    signupFn(dataForm)

    // reseteamos el form
    setDataForm(initialState)
    
    navigate( redirect || '/')

  }

  return (
    <article className="signin__page">
      <Helmet>
        <title>Mern Ecommerce | Registro de Usuario</title>
      </Helmet>

      <h2 className="signin__title">Crear Cuenta</h2>
      <section className="formulario">
        <form 
          className="formulario_auth"
          onSubmit={handlerSubmit}
        >
          <div className="campo">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              onChange={handlerChange}
              value={dataForm.name}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              id="email"
              onChange={handlerChange}
              value={dataForm.email}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              onChange={handlerChange}
              value={dataForm.password}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="confirm">Confirm Password</label>
            <input 
              type="password" 
              name="confirm" 
              id="confirm"
              onChange={handlerChange}
              value={dataForm.confirm}
              required
            />
          </div>
          <button className="boton__signin">Sign Up</button>
          <div className="signin__link">
            <p>Tienes una cuenta? <Link to={`/signin?redirect=${redirect}`}>Inicia sesión</Link></p>
          </div>
        </form>
      </section>
    </article>
  )
}


export default SignUpPage