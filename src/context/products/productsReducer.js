
import {
  OBTENER_PRODUCT,
  OBTENER_PRODUCTS, OBTENER_PRODUCTS_ERROR, OBTENER_PRODUCTS_SUCCESS, OBTENER_PRODUCT_ERROR, OBTENER_PRODUCT_SUCCESS
} from '../../types';



export default (state, action) => {
  switch (action.type) {
    case OBTENER_PRODUCT:
    case OBTENER_PRODUCTS:
      return {
        ...state,
        loading: true
      }
    case OBTENER_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: false
      }
    case OBTENER_PRODUCT_ERROR:
    case OBTENER_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case OBTENER_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: false
      }
  }
}