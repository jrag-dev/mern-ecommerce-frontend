import React, { useContext } from 'react'
import CartContext from '../context/cart/cartContext'

const CartButtonComponent = ({ producto }) => {

  const { addCart } = useContext(CartContext)

  return (
    <button 
      className="product-card__button"
      onClick={() => addCart(producto._id)}
    >Añadir al carrito</button>
  )
}

export default CartButtonComponent
