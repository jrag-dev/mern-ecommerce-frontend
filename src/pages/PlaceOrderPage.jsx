import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { MdDeleteForever } from "react-icons/md";

import CartContext from '../context/cart/cartContext'
import CheckoutSteps from '../components/CheckoutSteps';
import AuthContext from '../context/auth/authContext';
import { Link, useNavigate } from 'react-router-dom';



const PlaceOrderPage = () => {

  const navigate = useNavigate()

  const { cart, order, createOrder } = useContext(CartContext)
  const { cartItems, shippingAddress, paymentMethod } = cart
  const { token } = useContext(AuthContext)

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment')
    }

    if (order) {
      navigate(`/order/${order._id}`)
    } 
  }, [navigate, order, paymentMethod])

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) /100 ;  // 123.2345 => 123.23

  cart.itemsPrice = round2(
    cart.cartItems.reduce((acc, item) => acc + item.cantidad * item.productoCart.price, 0)
  )

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
  cart.taxPrice = round2(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const handlerPlaceOrder = () => {

    const orderItem = cart.cartItems.map(item => (
        {
          slug: item.productoCart.slug,
          name: item.productoCart.name,
          image: item.productoCart.image,
          price: item.productoCart.price,
          cantidad: item.cantidad,
          producto: item.productoCart
        }
    ))

    const data = {
      orderItems: orderItem,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }

    createOrder(data, token)

    // navigate(`/order/${order._id}`)
  }
  
  return (
    <div className="placeorder contenedor">
      <Helmet>
        <title>Amazona | Payment Method</title>
      </Helmet>

      <CheckoutSteps step1="step1" step2="step2" step3="step3" step4="step4"></CheckoutSteps>

      <h2>Payment Method</h2>

      <div className="placeorder__grid">
        <div className="placeorder__shipping">
          <h3>Shipping</h3>
          <p><span>Name:</span>{shippingAddress.name}</p>
          <p><span>Address:</span>{`${shippingAddress.code}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country}`}</p>
          <Link to='/shipping'>Editar</Link>
        </div>

        <div className="placeorder__payment">
          <h3>Payment</h3>
          <p><span>Method:</span>{paymentMethod}</p>
          <Link to="/payment">Editar</Link>
        </div>

        <div className="placeorder__resumen">
          <h3>Order Summary</h3>
          <div className="resumen__row">
            <p>Items:</p>
            <p>$ {cart.itemsPrice.toFixed(2)}</p>
          </div>
          <div className="resumen__row">
            <p>Shipping:</p>
            <p>$ {cart.shippingPrice.toFixed(2)}</p>
          </div>
          <div className="resumen__row">
            <p>Tax:</p>
            <p>$ {cart.taxPrice.toFixed(2)}</p>
          </div>
          <div className="resumen__row">
            <p>Orden Total:</p>
            <p>$ {cart.totalPrice}</p>
          </div>
          <button
            onClick={handlerPlaceOrder}
            disabled={cartItems.length === 0}
          >Place Order</button>
        </div>

        <div className="placeorder_products">
          {
            cartItems.map(({productoCart, cantidad }) => (
              <div className="cart__item" key={productoCart._id}>
                <div className="cart__item-img">
                  <img src={`${productoCart.image}`} alt={`${productoCart.name}`}/>
                </div>
                <div className="cart__item-name">
                  <p><Link to={`/product/slug/${productoCart.slug}`}>{productoCart.name}</Link></p>
                </div>
                <div className="cart__item-cantidad">

                  <p>{cantidad}</p>

                </div>
                <div className="cart__item-precio">
                  <p>${productoCart.price}</p>
                </div>
                <div className="cart__item-eliminar">
                  <Link to="/cart">Editar</Link>
                </div>
              </div>
            ))
          }
        </div>

      </div>


    </div>
  )
}

export default PlaceOrderPage