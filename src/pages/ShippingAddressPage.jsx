import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CartContext from '../context/cart/cartContext';
import AuthContext from '../context/auth/authContext';
import CheckoutSteps from '../components/CheckoutSteps';


const initialState = {
  name: '',
  address: '',
  city: '',
  code: '',
  country: ''
}

const ShippingAddressPage = () => {

  const navigate = useNavigate()

  const { cart, addShippingData } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const [datos, setDatos] = useState(cart.shippingAddress || initialState)

  useEffect(() => {
    if (!user) {
      navigate('/signin?redirect=/shipping')
    }
  }, [user, navigate])

  const handlerChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value 
    })
  }

  const handlerSubmit = e => {
    e.preventDefault()

    // validaciones

    // pasar al action
    addShippingData(datos)

    // resetear el formulario
    setDatos(initialState)

    // redireccionar
    navigate('/payment')
  }

  return (
    <div className="shipping_page contenedor">
      <Helmet>
        <title>Amazona | Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1="step1" step2="step2"></CheckoutSteps>


      <section className="formulario">
        <form
          onSubmit={handlerSubmit}
          >
          <h2>Shipping Address</h2>
          <div className="campo">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              placeholder="Enter full name"
              onChange={handlerChange}
              value={datos.name}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              name="address" 
              id="address"
              placeholder="Enter address"
              onChange={handlerChange}
              value={datos.address}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              name="city" 
              id="city"
              placeholder="Enter your city"
              onChange={handlerChange}
              value={datos.city}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="code">Postal Code</label>
            <input 
              type="text" 
              name="code" 
              id="code"
              placeholder="Enter your Postal code"
              onChange={handlerChange}
              value={datos.code}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="country">Country</label>
            <input 
              type="text" 
              name="country" 
              id="country"
              placeholder="Enter your Country"
              onChange={handlerChange}
              value={datos.country}
              required
            />
          </div>
          <button className="boton__shipping" type="submit">Continuar</button>
        </form>
      </section>

    </div>
  )
}

export default ShippingAddressPage