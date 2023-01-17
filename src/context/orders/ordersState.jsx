import React, { useReducer } from 'react'

import OrdersContext from './ordersContext'
import ordersReducer from './ordersReducer'
import clienteAxios from '../../config/axios'

import { GUARDAR_CLIENTE_ID, GUARDAR_ORDER_ACTUAL, OBTENER_ORDERS, PAY_REQUEST, PAY_SUCCESS } from '../../types'


const OrdersState = ({ children}) => {

  const initialState = {
    order : {},
    loadingPay: false,
    successPay: false,
    clienteId: null,
    orders: [],
  }

  const [state, dispatch] = useReducer(ordersReducer, initialState)

  // TODO: funciones que cambian el state

  // Función que permite obtoner la order por su id
  const getOrder = async (orderId, token) => {
    try {
      const respuesta = await clienteAxios.get(`/orders/${orderId}`, 
        {
          headers: {
            authorization: `Bearer ${token}` 
          }
        }
      );

      console.log(respuesta.data);

      dispatch({
        type: GUARDAR_ORDER_ACTUAL,
        payload: respuesta.data
      })

    } catch (error) {
      console.log(error)
    }
  }


  const loadPaypalScriptFn = async (token) => {
    try {      
      const { data: clienteId } = await clienteAxios.get('/keys/paypal', 
         {
           headers: {
             authorization: `Bearer ${token}` 
           }
         }
       )
      console.log(clienteId)
      dispatch({
        type: GUARDAR_CLIENTE_ID,
        payload: clienteId
      })
    } catch (error) {
      console.log(error)
    }
  }

  function onApproveFn(data, actions, order, token) {

    if (!order) return

    console.log(order, token)
    return actions.order.capture().then( async function (details) {
      try {
        const name = details.payer.name.given_name;
        console.log(`Transaction completed by ${name}`)
        dispatch({
          type: PAY_REQUEST
        })
        const { data } = await clienteAxios.put(`/orders/${order._id}/pay`, 
        details,
        {
          headers: {
            authorization: `Bearer ${token}` 
          }
        }
      )

      dispatch({
        type: PAY_SUCCESS,
        payload: data
      })
        
      } catch (error) {
        console.log(error)
      }
    })
  }


  const obtenerOrders = async (token) => {
    try {
      const { data } = await clienteAxios.get('/orders', 
        {
           headers: {
             authorization: `Bearer ${token}` 
           }
        }
      )

      console.log(data);

      dispatch({
        type: OBTENER_ORDERS,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }



  const datos = {
    orders: state.orders,
    order: state.order,
    clienteId: state.clienteId,
    loadingPay: state.loadingPay,
    successPay: state.successPay,
    getOrder,
    loadPaypalScriptFn,
    onApproveFn,
    obtenerOrders
  }

  return (
    <OrdersContext.Provider value={datos}>
      { children }
    </OrdersContext.Provider>
  )
}

export default OrdersState