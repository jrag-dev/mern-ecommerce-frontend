import React, { useEffect } from 'react'

import ProductComponent from '../components/ProductComponent';
import { useContext } from 'react';
import ProductsContext from '../context/products/productsContext';
import { Helmet } from 'react-helmet-async';
import cartReducer from '../context/cart/cartReducer';
import CartContext from '../context/cart/cartContext';

const HomePage = () => {

  const { products, loading, error, obtenerProductosFn } = useContext(ProductsContext);
  const { cart } = useContext(CartContext);

  console.log(products)

  useEffect(() => {
    obtenerProductosFn()
  }, [])
  

  return (
    <article>
      <Helmet>
      <title>Mern-Ecommerce | Productos</title>
      </Helmet>

      <h2 className='titulo'>Productos destacados</h2>

      <section className="products">
        {
          loading
          ? (
            <div className="loading">Loading...</div>
          ): error ? (
            error === 'Producto no encontrado'
            ? (
              <div className="error">No encontrado</div>
            ): (
              <div className="error">{error}</div>
            )
          ): (
            products.map(product => (
              <ProductComponent
                key={product.slug}
                product={product}
              />
            ))
          )
        }

      </section>
    </article>
  )
}

export default HomePage
