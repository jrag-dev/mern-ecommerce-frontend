import React from 'react'
import { useReducer } from 'react'
import CartContext from './cartContext'
import cartReducer from './cartReducer'


import {
  ADD_PRODUCT_CART, CALCULAR_TOTAL_CART, CREATE_ORDER, DELETE_PRODUCT_CART, GUARDAR_METODO_PAGO, GUARDAR_SHIPPING_ADDRESS
} from '../../types'

import clienteAxios from '../../config/axios'


const CartState = ({ children }) => {

  const initialState = {
    cart: {
      cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
      // total: localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : 0,
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
      paymentMethod: localStorage.getItem('paymentMethod')
        ? localStorage.getItem('paymentMethod')
        : '',
    }
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)


  // TODO: Funciones que cambiaran el state de carts

  // Función que permite añadir productos al cart
  const addCart = async (productoId) => {
    try {

      const respuesta = await clienteAxios.get(`/products/${productoId}`)

      dispatch({
        type: ADD_PRODUCT_CART,
        payload: {
          productoCart: respuesta.data,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // función que permite actualizar la cantidad del producto
  const updateCantidadCart = async ( producto, cantidad ) => {

    try {
      const respuesta = await clienteAxios.get(`/products/${producto._id}`)

      dispatch({
        type: ADD_PRODUCT_CART,
        payload: {
          productoCart: respuesta.data,
          cantidad: cantidad
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  // funcion que permite eliminar un producto del cart
  const deleteCartItem = async (producto) => {

    try {
      const respuesta = await clienteAxios.get(`/products/${producto._id}`)

      dispatch({
        type: DELETE_PRODUCT_CART,
        payload: respuesta.data
      })

    } catch (error) {
      console.log(error)
    }
  }

  // añadiendo la funcionalidad de shipping address 
  const addShippingData = (data) => {
    try {
      dispatch({
        type: GUARDAR_SHIPPING_ADDRESS,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Función que permite guardar el método de pago
  const addPaymentMethod = (data) => {
    try {
      dispatch({
        type: GUARDAR_METODO_PAGO,
        payload: data
      })
    } catch (error) {
      /* handle error */
      console.log(error)
    }
  }

  const addTotal = (data) => {
    try {
      dispatch({
        type: CALCULAR_TOTAL_CART,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Funcion que permite crear una nueva order
  const createOrder = async (data, token) => {
    try {
      const respuesta = await clienteAxios.post('/orders', data,
        {
          headers: {
            authorization: `Bearer ${token}` 
          }
        }
      )
      console.log(respuesta.data)
      dispatch({
        type: CREATE_ORDER,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
    }
  }



  const datos = {
    cart: state.cart,
    order: state.order,
    addCart,
    addTotal,
    updateCantidadCart,
    deleteCartItem,
    addShippingData,
    addPaymentMethod,
    createOrder,
  }
  return (
    <CartContext.Provider value={datos}>
      { children }
    </CartContext.Provider>
  )
}

export default CartState
