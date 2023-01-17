// Types para el context de products 

export const OBTENER_PRODUCTS = 'OBTENER_PRODUCTS';
export const OBTENER_PRODUCTS_SUCCESS = 'OBTENER_PRODUCTS_SUCCESS';
export const OBTENER_PRODUCTS_ERROR = 'OBTENER_PRODUCTS_ERROR';
export const OBTENER_PRODUCT = 'OBTENER_PRODUCT';
export const OBTENER_PRODUCT_SUCCESS = 'OBTENER_PRODUCT_SUCCESS';
export const OBTENER_PRODUCT_ERROR = 'OBTENER_PRODUCT_ERROR';


// Types para el context de cart

export const SHOW_CART = 'SHOW_CART';
export const HIDE_CART = 'HIDE_CART';
export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';
export const DELETE_PRODUCT_CART = 'DELETE_PRODUCT_CART';
export const CALCULAR_TOTAL_CART = 'CALCULAR_TOTAL_CART';


// Types para el context de autenticacion

export const LOGIN_EXITOSO = 'LOGIN_EXITOSO';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTRO_EXITOSO = 'REGISTRO_EXITOSO';
export const REGISTRO_ERROR = 'REGISTRO_ERROR';
export const CERRAR_SESION = 'CERRAR_SESION';


// Types para el context de shipping

export const GUARDAR_SHIPPING_ADDRESS = 'GUARDAR_SHIPPING_ADDRESS';

// Types para el metodo de pago

export const GUARDAR_METODO_PAGO = 'GUARDAR_METODO_PAGO';

// Types para el context de create order

export const CREATE_ORDER = 'CREATE_ORDER';
export const OBTENER_ORDERS = 'OBTENER_ORDERS';

// Types para mostrar la order actual

export const GUARDAR_ORDER_ACTUAL = 'GUARDAR_ORDER_ACTUAL';

// Types para la sescion de pagos con paypal
export const GUARDAR_CLIENTE_ID = 'GUARDAR_CLIENTE_ID';
export const PAY_REQUEST = 'PAY_REQUEST';
export const PAY_SUCCESS = 'PAY_SUCCESS';
export const PAY_FAIL = 'PAY_FAIL';
export const PAY_RESET = 'PAY_RESET';

// Types para el profile
export const UPDATE_PROFILE = 'UPDATE_PROFILE';