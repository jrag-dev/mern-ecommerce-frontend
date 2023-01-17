import React, { useContext } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import CartContext from '../context/cart/cartContext';


const CartItemComponent = ({ cartItem }) => {

  const { updateCantidadCart, deleteCartItem } = useContext(CartContext)

  const { productoCart, cantidad } = cartItem


  return (
    <div className="cart__item" key={cartItem._id}>
      <div className="cart__item-img">
      <img src={`${productoCart.image}`} alt={`${productoCart.name}`}/>
      </div>
      <div className="cart__item-name">
        <p><Link to={`/product/slug/${productoCart.slug}`}>{productoCart.name}</Link></p>
      </div>
      <div className="cart__item-cantidad">
        <button
          type="button"
          onClick={() => updateCantidadCart(productoCart, cantidad - 1)}
        >
          <AiFillMinusCircle size="30px" color="#e63946" />
        </button>
        <p>{cantidad}</p>
        <button
          type="button"
          onClick={() => updateCantidadCart(productoCart, cantidad + 1)}
        >
          <AiFillPlusCircle size="30px" color="#2a9d8f"/>
        </button>
      </div>
      <div className="cart__item-precio">
        <p>${productoCart.price}</p>
      </div>
      <div className="cart__item-eliminar">
        <button
          onClick={() => deleteCartItem(productoCart)}
        >
          <MdDeleteForever className="icon-eliminar" size="30px" color="#e63946"/>
          <span className="span-eliminar">Eliminar</span>
        </button>
      </div>
    </div>
  )
}

export default CartItemComponent
