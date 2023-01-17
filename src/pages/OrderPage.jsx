import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async'
import { Link, useParams, useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import LoaderComponent from '../components/LoaderComponent';
import AuthContext from '../context/auth/authContext';
import OrdersContext from '../context/orders/ordersContext';
import clienteAxios from '../config/axios';

const OrderPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const { order, clienteId, successPay, getOrder, loadPaypalScriptFn, onApproveFn } = useContext(OrdersContext)
  const { user, token } = useContext(AuthContext)

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!user) {
      return navigate('/login')
    }

    if (!order._id || successPay || (order._id && order._id !== id)) {
      getOrder(id, token)
    } else {

      const obtenerClienteId = async (token) => {
        await loadPaypalScriptFn(token)
      }

      obtenerClienteId(token)
      console.log('aun no existe cliente-id')

      if (clienteId) {

        const loadPaypalScript = async (clienteId) => {
          
          // await loadPaypalScriptFn(token)
  
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': clienteId,
              currency: 'USD',
            }
          })
          paypalDispatch({
            type: 'setLoadingStatus',
            value: 'pending'
          })

        }
        loadPaypalScript(clienteId)
      }

    }
  }, [id, token, paypalDispatch, clienteId, order])


  
  // funcion que realiza la consulta para obtener el cliente id para paypal

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          { 
            amount: { value: order.totalPrice },
          },
        ],
      })
    .then((orderID) => {
      return orderID;
    })
  }

  console.log(order)

  function onApprove(data, actions) {
    console.log('order._id: ' +  order._id)
    onApproveFn(data, actions, order, token)
  }


  function onError(data, actions) {
    console.log(data)
  }



  return (
    <div className="placeorder contenedor">
      <Helmet>
        <title>Amazona | Show new Order</title>
      </Helmet>

      {
        !order._id
          ? (
            <LoaderComponent/>
          )
          : (
            <>
              <h2>{`Order: ${order._id}`}</h2>
              {
                console.log(order.isPaid)
              }

              <div className="placeorder__grid order">
                <div className="placeorder__shipping">
                  <h3>Shipping</h3>
                  <p><span>Name:</span>{order.shippingAddress.name}</p>
                  <p><span>Address:</span>{`${order.shippingAddress.code}, ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}</p>
                  
                  <p className="order__not">{order.isDelivered ? 'Delivered' : 'Not delivered'}</p>
                </div>
        
                <div className="placeorder__payment">
                  <h3>Payment</h3>
                  <p><span>Method:</span>{order.paymentMethod}</p>
                  <p className={ order.isPaid === true ? 'order__paid' : 'order__not'}>{ order.isPaid === true ? `Paid at ${order.paidAt}` : 'Not paid'}</p>
                </div>
        
                <div className="placeorder__resumen placeorder__resumen-order">
                  <h3>Order Summary</h3>
                  <div className="resumen__row">
                    <p>Items:</p>
                    <p>$ {order.itemsPrice.toFixed(2)}</p>
                  </div>
                  <div className="resumen__row">
                    <p>Shipping:</p>
                    <p>$ {order.shippingPrice.toFixed(2)}</p>
                  </div>
                  <div className="resumen__row">
                    <p>Tax:</p>
                    <p>$ {order.taxPrice.toFixed(2)}</p>
                  </div>
                  <div className="resumen__row resumen_total">
                    <p>Orden Total:</p>
                    <p>$ {order.totalPrice}</p>
                  </div>
                  {
                    !order.isPaid ? (
                      <div className="resumen__paypal">
                        {
                          isPending ? (
                            <LoaderComponent/>
                          ) : (
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          )
                        }
                      </div>
                    )
                    : null
                  }
                </div>
        
                <div className="placeorder_products">
                  {
                    order.orderItems.map((item) => (
                      <div className="cart__item" key={item._id}>
                        <div className="cart__item-img">
                          <img src={`${item.image}`} alt={`${item.name}`}/>
                        </div>
                        <div className="cart__item-name">
                          <p><Link to={`/product/slug/${item.slug}`}>{item.name}</Link></p>
                        </div>
                        <div className="cart__item-cantidad">
        
                          <p>{item.cantidad}</p>
        
                        </div>
                        <div className="cart__item-precio">
                          <p>${item.price}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
        
              </div>
            </>
          )
      }

    </div>
  )
}

export default OrderPage