import { createBrowserRouter } from "react-router-dom";

import LayoutPublic from "../layouts/LayoutPublic";
import NotFound404 from '../pages/NotFound404';
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";


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
          }
        ]
      }
    ]
  }
])