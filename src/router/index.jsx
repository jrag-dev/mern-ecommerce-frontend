import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic";


import NotFound404 from '../pages/NotFound404';


export const router = createBrowserRouter([
  {
    path:'/',
    element: <LayoutPublic/>,
    errorElement: <NotFound404/>,
  }
])