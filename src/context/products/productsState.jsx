import React, { useReducer } from 'react'
import productsReducer from './productsReducer'
import ProductsContext from './productsContext';
import clienteAxios from '../../config/axios';

import { 
  OBTENER_PRODUCTS,
  OBTENER_PRODUCTS_SUCCESS,
  OBTENER_PRODUCTS_ERROR
} from '../../types';


const ProductsState = ({ children }) => {

  const initialState = {
    products: [],
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
        payload: true
      })
    }
  }


  const datos = {
    products: state.products,
    loading: state.loading,
    error: state.error,
    obtenerProductosFn
  }


  return (
    <ProductsContext.Provider value={datos}>
      { children }
    </ProductsContext.Provider>
  )
}

export default ProductsState
