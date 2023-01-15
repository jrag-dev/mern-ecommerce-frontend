import React from 'react'
import { Link } from 'react-router-dom'


const ProductComponent = ({ product }) => {
  return (
    <article className="product-card" key={product.slug}>

      <Link to={`/product/slug/${product.slug}`} className="product-card__img">
        <img src={product.image}alt={product.name}/>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/slug/${product.slug}`}>
          <p className="product-card__name">{product.name}</p>
        </Link>
        <div className="row">
          <p className="product-card__reviews">{product.numReviews} reviews</p>
        </div>
        <p className="product-card__price">
          <strong>${product.price}</strong>
        </p>
        <button className="product-card__button">
          Añadir al carrito
        </button>
      </div>


  </article>
  )
}

export default ProductComponent
