import React from 'react'

const CheckoutSteps = (props) => {
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? 'active' : 'noactivo'}>Sign-In</div>
      <div className={props.step2 ? 'active' : 'noactivo'}>Shipping</div>
      <div className={props.step3 ? 'active' : 'noactivo'}>Payment</div>
      <div className={props.step4 ? 'active' : 'noactivo'}>Place Order</div>
    </div>
  )
}

export default CheckoutSteps
