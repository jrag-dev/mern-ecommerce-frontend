import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';


import './styles/main.css'

import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import ProductsState from './context/products/productsState';
import CartState from './context/cart/cartState';
import AuthState from './context/auth/authState'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthState>
        <ProductsState>
          <CartState>
            <RouterProvider router={router} />
          </CartState>
        </ProductsState>
      </AuthState>
    </HelmetProvider>
  </React.StrictMode>,
)