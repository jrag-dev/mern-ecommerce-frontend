
import {
  OBTENER_PRODUCTS, OBTENER_PRODUCTS_ERROR, OBTENER_PRODUCTS_SUCCESS
} from '../../types';



export default (state, action) => {
  switch (action.type) {
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
    case OBTENER_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
  }
}