import React from 'react'
import HeaderComponent from '../components/HeaderComponent';

import data from '../data';
import ProductComponent from '../components/ProductComponent';

const LayoutPublic = () => {
  return (
    <>
      <HeaderComponent/>
      <main className="container">
        <h1>Productos Destacados</h1>

        <section className="products">
          {
            data.products.map(product => (
              <ProductComponent
                key={product.slug}
                product={product}
              />
            ))
          }
        </section>

      </main>
      <footer className="container">
        footer
      </footer>
    </>
  )
}

export default LayoutPublic;