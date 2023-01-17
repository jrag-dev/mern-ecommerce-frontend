import { GUARDAR_CLIENTE_ID, GUARDAR_ORDER_ACTUAL, OBTENER_ORDERS, PAY_FAIL, PAY_REQUEST, PAY_RESET, PAY_SUCCESS } from "../../types"




export default (state, action) => {
  switch (action.type) {
    case GUARDAR_ORDER_ACTUAL:
      return {
        ...state,
        order: action.payload.order
      }
    case GUARDAR_CLIENTE_ID:
      return {
        ...state,
        clienteId: action.payload
      }
    case PAY_REQUEST:
      return {
        ...state,
        loadingPay: true
      }
    case PAY_SUCCESS:
      return {
        ...state,
        loadingPay: false,
        successPay: true
      }
    case PAY_FAIL:
      return {
        ...state,
        loadingPay: false,
    }
    case PAY_RESET:
      return {
        ...state,
        loadingPay: false,
        successPay: false
      }
    case OBTENER_ORDERS:
      return {
        ...state,
        orders: action.payload.orders
      }
    default:
      return state
  }
}