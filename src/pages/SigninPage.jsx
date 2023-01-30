import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthContext from '../context/auth/authContext';


const initialState = {
  email: '',
  password: ''
}
const SigninPage = () => {

  let navigate = useNavigate()

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const { user, error, message, signinFn } = useContext(AuthContext)
  //const { signinFn } = useContext(AuthContext)
  // let user = {}
  // let error = null

  const [dataForm, setDataForm] = useState(initialState)

  useEffect(() => {
    if (user) {
      toast.success(`Bienvenido, ${user.name}`)
      navigate(redirect)
    }

    if (error) {
      toast.error('Email o Password incorrecto!')
      return;
    }
  }, [user, redirect, error])

  const handlerChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value 
    })
  }

  const handlerSubmit = async e => {
    e.preventDefault()

    // pasamos al action
    await signinFn(dataForm)

    // reseteamos el form
    setDataForm(initialState)
    
    // navigate( redirect || '/')

  }

  return (
    <article className="signin__page">
      <Helmet>
        <title>Mern Ecommerce | Inicio de Sesión</title>
      </Helmet>

      <h2 className="signin__title">Iniciar Sesión</h2>
      <section className="formulario">
        <form 
          className="formulario_auth"
          onSubmit={handlerSubmit}
        >
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
          <button className="boton__signin">Sign In</button>
          <div className="signin__link">
            <p>Nuevo cliente? <Link to={`/signup?redirect=${redirect}`}>Crea tu cuenta</Link></p>
          </div>
        </form>
      </section>
    </article>
  )
}

export default SigninPage