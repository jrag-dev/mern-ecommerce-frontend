import { createBrowserRouter } from "react-router-dom";

import LayoutPublic from "../layouts/LayoutPublic";
import NotFound404 from '../pages/NotFound404';
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderPage from '../pages/OrderPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import ProfilePage from '../pages/ProfilePage';
import ShippingAddressPage from '../pages/ShippingAddressPage';
import PaymentMethodPage from '../pages/PaymentMethodPage';


import SigninPage from '../pages/SigninPage';
import SignUpPage from '../pages/SignUpPage';

export const router = createBrowserRouter([
  {
    path:'/',
    element: <LayoutPublic/>,
    errorElement: <NotFound404/>,
    children: [
      {
        errorElement: <NotFound404/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
          {
            path: '/product/slug/:slug',
            element: <ProductPage/>,
          },
          {
            path: '/cart',
            element: <CartPage/>,
          },
          {
            path: '/shipping',
            element: <ShippingAddressPage/>,
          },
          {
            path: '/payment',
            element: <PaymentMethodPage/>,
          },
          {
            path: '/placeorder',
            element: <PlaceOrderPage/>,
          },
          {
            path: '/order/:id',
            element: <OrderPage/>,
          },
          {
            path: '/orderhistory',
            element: <OrderHistoryPage/>,
          },
          {
            path: '/signin',
            element: <SigninPage/>,
          },
          {
            path: '/signup',
            element: <SignUpPage/>,
          },
          {
            path: '/profile',
            element: <ProfilePage/>,
          }
        ]
      }
    ]
  }
])