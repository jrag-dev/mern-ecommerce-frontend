import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';

import './styles/main.css'

import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import ProductsState from './context/products/productsState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ProductsState>
        <RouterProvider router={router} />
      </ProductsState>
    </HelmetProvider>
  </React.StrictMode>,
)
