import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import CartItemComponent from '../components/CartItemComponent'
import CartContext from '../context/cart/cartContext'


const CartPage = () => {

  let navigate = useNavigate()

  const { cart, addTotal } = useContext(CartContext)
  const { cartItems } = cart

  useEffect(() => {
    const total = totalCart(cart.cartItems).total
    addTotal(total)
  }, [cartItems])

  const totalCart = (arr) => {
    const cartItem = arr.reduce((acc, item) => acc + item.cantidad, 0)
    const total = arr.reduce((acc, item) => acc + item.productoCart.price*item.cantidad, 0)
    return {
      cartItem,
      total
    }
  }

  const handlerCheckout = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <article className="cart-page">

      <Helmet>
        <title>{`Mern Ecommerce | carrito de compras`}</title>
      </Helmet>

      {/* {
        cart.cartItems.length !== 0 && (
          <div className="contenedor_link">
            <Link className="link_button" to="/"><AiOutlineLeft className="link_button-svg" color="#FFF" size="20px"/>Volver</Link>
          </div>
        )
      } */}

      <h2 className="cart-page-h2">Carirto de Compras</h2>

      {
        cart.cartItems.length === 0 
          ? (
            <div className="cart__vacio">
              <p className="cart__vacio-p">El cart está vacío!</p>
              <Link className="cart__vacio-link" to="/">Ir al area de ventas</Link>
            </div>
          )
          : (
            <>
              <div className="cart__items">
                {
                  cart.cartItems.map(cartItem => (
                    <CartItemComponent
                      key={cartItem.productoCart._id}
                      cartItem={cartItem}
                    />
                  ))
                }
              </div>
              <div className="cart__total">
                <p>
                  Subtotal ({totalCart(cart.cartItems).cartItem} items): $
                  {
                    totalCart(cart.cartItems).total
                  }
                </p>
                <button
                  type="button"
                  onClick={() => handlerCheckout()}
                >Proceder a Checkout</button>
              </div>
            </>
          )
      }
    </article>
  )
}

export default CartPage