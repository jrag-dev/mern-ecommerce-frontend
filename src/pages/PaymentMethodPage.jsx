import React, {useContext, useEffect, useState} from 'react'
import { Helmet } from 'react-helmet-async';
import {useNavigate} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import CartContext from '../context/cart/cartContext';



const PaymentMethodPage = () => {

  const navigate = useNavigate()

  const { cart, addPaymentMethod } = useContext(CartContext)
  const { shippingAddress } = cart

  const [paymentMethod, setPaymentMethod] = useState('')


  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [ shippingAddress, navigate ])

  const handlerSubmit = e => {
    e.preventDefault();

    // validaciones

    // pasar al action
    addPaymentMethod(paymentMethod)

    // direccionar
    navigate('/placeorder')
  }

  return (
    <div className="payment contenedor">
      <Helmet>
        <title>Amazona | Payment Method</title>
      </Helmet>

      <CheckoutSteps step1="step1" step2="step2" step3="step3"></CheckoutSteps>

      <h2>Payment Method</h2>

      <form
        onSubmit={handlerSubmit}
      >
        <div className="campo__payment">
          <div className="campo__button">
            <div className={paymentMethod === "PayPal" ? "campo__lleno" : "campo__vacio"}></div>
            <input
              type="checkbox"
              name="paypal"
              id="paypal"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={ (e) => setPaymentMethod(e.target.value) }
            />
          </div>
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="campo__payment">
          <div className="campo__button">
        <div className={paymentMethod === "Stripe" ? "campo__lleno" : "campo__vacio"}></div>
            <input
              type="checkbox"
              name="stripe"
              id="stripe"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={ (e) => setPaymentMethod(e.target.value) }
            />
          </div>
          <label htmlFor="stripe">Stripe</label>
        </div>
        <button
          type="submit"
          className="button__payment"
        >Continuar</button>
      </form>
    
    </div>
  )
}

export default PaymentMethodPage
