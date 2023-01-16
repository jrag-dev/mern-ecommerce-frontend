import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductsContext from '../context/products/productsContext'
import RatingComponent from '../components/RatingComponent';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const ProductPage = () => {

  const { slug } = useParams();
  const { product, loading, error, obtenerProductoFn } = useContext(ProductsContext);

  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    obtenerProductoFn(slug)
  }, [slug])

  let cantidadCountInStock = [];

  for (let i = 0; i < product?.countInStock; i++) {
    cantidadCountInStock.push(i)
  }

  const handleChange = e => {
    console.log(e)
  }

  return (
    <article className="product">

      <Helmet>
        <title>Mern-Ecommerce | Detalles del Producto</title>
      </Helmet>

      <h2>Detalles del producto: </h2>

      {
        loading ? (
          <div>Loading...</div>
        ): error ? (
          <div>Error</div>
        ) : (
          product && (
            <div className="product-detalles">
              <div className="product-detalles__img">
                <img src={`/${product.image}`} alt={`${product.name}`}/>
              </div>
              <div className="product-detalles__body">
                <Link to={`/product/slug/${product.slug}`}>
                  <p className="product-card__name">{product.name}</p>
                </Link>
                <div className="flex-between gap">
                  <RatingComponent
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                  <p className="product-card__reviews">{product.numReviews} reviews</p>
                </div>
                <p className="product-card__price">
                  ${product.price}
                </p>
                <p className="product-card__description">
                  {product.description}
                </p>
              </div>

              <div className={`product-card__status ${product.countInStock > 0 ? null : 'none'}`}>
                <div className="flex-between">
                  <p>Precio:</p>
                  <p>${product.price}</p>
                </div>
                <div className="flex-between">
                  <p>Estado:</p>
                  <p className={`${product.countInStock > 0 ? 'disponible' : 'agotado'}`}>{`${product.countInStock > 0 ? 'Disponible' : 'Agotado'}`}</p>
                </div>
                {
                  product.countInStock > 0 && (
                    <>
                      <div className="flex-between none">
                        <p>Cantidad: </p>
                        <select
                            onChange={handleChange}
                          >
                            {
                              cantidadCountInStock.map(item => (
                                <option value={Number(item)} key={item}>{item}</option>
                              ))
                            }
                          </select>
                      </div>
                      <button className="btn-product">Agregar al carrito</button>
                    </>
                  )
                }
              </div>
              
            </div>
        )
        ) 
      }
    </article>
  )
}

export default ProductPage