import axios from 'axios';

console.log(import.meta.env.VITE_BACKEND_URL)

const clienteAxios = axios.create(
  {
    baseURL: import.meta.env.VITE_BACKEND_URL
  }
)


export default clienteAxios;