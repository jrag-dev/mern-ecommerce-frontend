import React from 'react'
import { Link } from 'react-router-dom'


const ProductComponent = ({ product }) => {
  return (
    <article className="product" key={product.slug}>

      <Link to={`/product/slug/${product.slug}`} className="product__img">
        <img src={product.image}alt={product.name}/>
      </Link>

      <div className="product__body">
        <Link to={`/product/slug/${product.slug}`}>
          <p className="product__name">{product.name}</p>
        </Link>
        <div className="row">
          <p className="product__reviews">{product.numReviews} reviews</p>
        </div>
        <p className="product__price">
          <strong>${product.price}</strong>
        </p>
        <button className="product__button">
          Añadir al carrito
        </button>
      </div>


  </article>
  )
}

export default ProductComponent
