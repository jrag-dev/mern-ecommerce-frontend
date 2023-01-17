import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import CartContext from '../context/cart/cartContext'

import RatingComponent from './RatingComponent'
import CartButtonComponent from '../components/CartButtonComponent'



const ProductComponent = ({ product }) => {

  const { agregarItemCart } = useContext(CartContext)

  return (
    <article className="product-card" key={product.slug}>

      <Link to={`/product/slug/${product.slug}`} className="product-card__img">
        <img src={product.image} alt={product.name}/>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/slug/${product.slug}`}>
          <p className="product-card__name">{product.name}</p>
        </Link>
        <div className="row">
          <RatingComponent
            rating={product.rating}
            numReviews={product.numReviews}
          />
          <p className="product-card__reviews">{product.numReviews} reviews</p>
        </div>
        <p className="product-card__price">
          <strong>${product.price}</strong>
        </p>
        {
          product.countInStock === 0 
          ? <p className="product__nodisponible">No disponible</p>
          : (
            <div className="product__card">
              <CartButtonComponent
                producto={product}
              />
            </div>
          )
        }
      </div>


  </article>
  )
}

export default ProductComponent
