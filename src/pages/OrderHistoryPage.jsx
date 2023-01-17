import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import OrdersContext from '../context/orders/ordersContext'

const OrderHistoryPage = () => {

  const navigate = useNavigate()
  const { orders, obtenerOrders } = useContext(OrdersContext)
  const { token } = useContext(AuthContext)
  console.log(orders, token)

  useEffect(() => {
    obtenerOrders(token)
  }, [])



  return (
    <div className="order-history">
      <Helmet>
        <title>Order History</title>
      </Helmet>

      {

      }

      <div className="order-history__container">
        <h1>Order History</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              !orders 
                ? <div>Cargando...</div>
                : (
                  orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0,10)}</td>
                      <td>$ {order.totalPrice.toFixed(2)}</td>
                      <td>{order.paidAt ? order.paidAt.substring(0, 10) : 'No'}</td>
                      <td>
                        {order.isDelivered
                          ? order.isDelivered.substring(0, 10)
                          : 'No'
                        }
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-details"
                          onClick={() => navigate(`/order/${order._id}`)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistoryPage