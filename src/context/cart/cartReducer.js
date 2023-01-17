import {
  ADD_PRODUCT_CART, CALCULAR_TOTAL_CART, CREATE_ORDER, DELETE_PRODUCT_CART, GUARDAR_METODO_PAGO, GUARDAR_SHIPPING_ADDRESS
} from '../../types'

export default (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CART:

      let productoCart = action.payload.productoCart
      let cantidadCart = action.payload.cantidad || 1

      let existeProductoCart = state.cart.cartItems.find(
        (item) => item.productoCart._id === productoCart._id
      )
      
      const disponibleFn = () => {
        let disponible = true

        if (productoCart.countInStock === 0) {
          disponible = false
        }

        return disponible
      }

      let cartItems = disponibleFn() 
        ? (
            existeProductoCart 
            ? state.cart.cartItems.map((item) => 
              item.productoCart._id === productoCart._id 
              ? existeProductoCart.cantidad <= cantidadCart
                ? existeProductoCart.cantidad === cantidadCart
                  ? { ...item, cantidad: item.cantidad }
                  : { ...item, cantidad: item.cantidad + 1} 
                : { ...item, cantidad: item.cantidad - 1} 
              : item
            )
            : [...state.cart.cartItems, { productoCart, cantidad: 1}]
          ) 
        : existeProductoCart.countInStock > 0
          ? [...state.cart.cartItems, { productoCart, cantidad: 1}]
          : [...state.cart.cartItems]

      localStorage.setItem('cartItems', JSON.stringify(cartItems))

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems
        }
      }
    case CALCULAR_TOTAL_CART:
      localStorage.setItem('total', action.payload)
      return {
        ...state,
        cart: {
          ...state.cart,
          total: action.payload
        }
      }
    case DELETE_PRODUCT_CART:
      let producto = action.payload

      let buscarProductoCart = state.cart.cartItems.find(
        (item) => item.productoCart._id === producto._id
      )

      let cartItem = buscarProductoCart
        ? (
          state.cart.cartItems.filter(
            item => item.productoCart._id !== producto._id
          )
        )
        : [...state.cart.cartItems]
      
      localStorage.setItem('cartItems', JSON.stringify(cartItem))

      return {
        ...state,
        cart: {
          cartItems: cartItem
        }
      }
    
    case GUARDAR_SHIPPING_ADDRESS:
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        }
      }
    
    case GUARDAR_METODO_PAGO:
      localStorage.setItem('paymentMethod', action.payload)
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      }
    case CREATE_ORDER:
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('cartItems')
      localStorage.removeItem('paymentMethod')
      return {
        ...state,
        order: action.payload.order,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
          shippingPrice: 0,
          totalPrice: 0
        }
      }
    default:
      return state
  }
}
