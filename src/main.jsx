import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'

import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import ProductsState from './context/products/productsState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsState>
      <RouterProvider router={router} />
    </ProductsState>
  </React.StrictMode>,
)
