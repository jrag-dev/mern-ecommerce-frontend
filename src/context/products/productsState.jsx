import React, { useReducer } from 'react'
import productsReducer from './productsReducer'
import ProductsContext from './productsContext';
import clienteAxios from '../../config/axios';

import { 
  OBTENER_PRODUCTS,
  OBTENER_PRODUCTS_SUCCESS,
  OBTENER_PRODUCTS_ERROR,
  OBTENER_PRODUCT_SUCCESS,
  OBTENER_PRODUCT,
  OBTENER_PRODUCT_ERROR
} from '../../types';
import { getError } from '../../utils/utils';


const ProductsState = ({ children }) => {

  const initialState = {
    products: [],
    categories: [],
    product: {},
    loading: false,
    error: false,
  }

  const [state, dispatch] = useReducer(productsReducer, initialState);

  // Funciones que cambiarán el state de productos

  const obtenerProductosFn = async () => {
    dispatch({
      type: OBTENER_PRODUCTS
    })
    try {
      const respuesta = await clienteAxios.get('/products');

      console.log(respuesta.data)
      
      dispatch({
        type: OBTENER_PRODUCTS_SUCCESS,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: OBTENER_PRODUCTS_ERROR,
        payload: getError(error)
      })
    }
  }

  const obtenerProductoFn = async (slug) => {
    dispatch({
      type: OBTENER_PRODUCT
    })
    try {
      const respuesta = await clienteAxios.get(`/products/slug/${slug}`)
      console.log(respuesta.data)
      dispatch({
        type: OBTENER_PRODUCT_SUCCESS,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: OBTENER_PRODUCT_ERROR,
        payload: getError(error)
      })
    }
  }


  const datos = {
    products: state.products,
    product: state.product,
    loading: state.loading,
    error: state.error,
    obtenerProductosFn,
    obtenerProductoFn
  }


  return (
    <ProductsContext.Provider value={datos}>
      { children }
    </ProductsContext.Provider>
  )
}

export default ProductsState
