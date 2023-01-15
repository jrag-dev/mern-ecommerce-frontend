import React from 'react'

import data from '../data';
import ProductComponent from '../components/ProductComponent';

const HomePage = () => {
  return (
    <div>
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
    </div>
  )
}

export default HomePage
