import React, { useEffect } from 'react'

import ProductComponent from '../components/ProductComponent';
import { useContext } from 'react';
import ProductsContext from '../context/products/productsContext';

const HomePage = () => {

  const { products, loading, error, obtenerProductosFn } = useContext(ProductsContext);

  useEffect(() => {
    obtenerProductosFn()
  }, [])
  

  return (
    <article>

      { !loading && <h1>Productos Destacados</h1> }

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
