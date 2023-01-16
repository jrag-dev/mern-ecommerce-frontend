import React, { useEffect } from 'react'

import ProductComponent from '../components/ProductComponent';
import { useContext } from 'react';
import ProductsContext from '../context/products/productsContext';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {

  const { products, loading, error, obtenerProductosFn } = useContext(ProductsContext);

  useEffect(() => {
    obtenerProductosFn()
  }, [])
  

  return (
    <article>
      <Helmet>
      <title>Mern-Ecommerce | Productos</title>
      </Helmet>

      { !loading && <h2 className='titulo'>Productos destacados</h2> }

      <section className="products">
        {
          loading
          ? (
            <div className="--center">
              <p>Loading...</p>
            </div>
          ): error ? (
            error === 'Producto no encontrado'
            ? (
              <div>No encontrado</div>
            ): (
              <div>Error</div>
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
