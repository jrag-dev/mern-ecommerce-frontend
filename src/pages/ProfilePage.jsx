import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';





const ProfilePage = () => {

  let navigate = useNavigate()

  const { user, token, error, message, updateProfile } = useContext(AuthContext)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')



  const handlerSubmit = e => {
    e.preventDefault()

    // validaciones
    if (password.trim() !== confirm.trim()) {
      toast('Los password no coinciden!')
      return;
    }

    const newData = {
      name: name,
      email: email,
      password: password,
    }

    console.log(newData)

    // pasamos al action
    updateProfile(newData, token)

    // reseteamos el form
   
    // Redireccionamos
    navigate('/')

  }

  return (
    <article className="signin__page">
      <Helmet>
        <title>Amazona | Profile</title>
      </Helmet>

      <h2 className="signin__title">Update Profile</h2>
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
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="confirm">Confirm Password</label>
            <input 
              type="password" 
              name="confirm" 
              id="confirm"
              onChange={(e) => setConfirm(e.target.value)}
              value={confirm}
              required
            />
          </div>
          <button className="boton__signin">Update</button>
        </form>
      </section>
    </article>
  )
}

export default ProfilePage