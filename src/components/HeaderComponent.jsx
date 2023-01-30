import React, { useContext, useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { FaUserCircle, FaCartPlus } from "react-icons/fa";


import '../styles/components/HeaderComponent.css';
import { Link, NavLink } from 'react-router-dom';
import CartContext from '../context/cart/cartContext';
import AuthContext from '../context/auth/authContext';

import SearchComponent from '../components/SearchComponent'

const HeaderComponent = () => {

  const { cart } = useContext(CartContext);
  const { user, signoutFn } = useContext(AuthContext)

  const [openMenu, setOpenMenu] = useState(false);


  const signoutHandler = () => {
    signoutFn()
    window.location.href = '/signin';
  }

  const handlerClickMenu = () => {
    setOpenMenu(!openMenu);
  }


  return (
    <header className="header">
      <nav className="container">

        <div className="mobile">

          <div className="mobile-header">
            <div className="logo">
              <Link to="/">Mern Ecommerce</Link>
            </div>
            <div className="more">
              <button className="btn-more" onClick={() => handlerClickMenu()}>
              <HiMenu/>
              </button>
            </div>
          </div>
          <div className={`links ${openMenu ? 'collapsed' : null}`}>
              <NavLink to="/">Productos</NavLink>
              <NavLink to="/cart">Carrito</NavLink>
          </div>
        </div>

        <div className="desktop">

          <div className="logo">
            <Link to="/">Mern Ecommerce</Link>
          </div>

          <div className="primary">
            <SearchComponent/>
          </div>

          <div className="secondary full">
            {
              !user ? (
                <>
                  <NavLink to="/" >Productos</NavLink>
                  <NavLink to="/cart" className="flex-row"><FaCartPlus/>
                  { 
                        cart.cartItems.length > 0 
                        ? (
                          <div className="cart__numbers">
                            {cart.cartItems.reduce((acc, item) => acc + item.cantidad, 0)}
                          </div>
                        )
                        : null
                      }
                  </NavLink>
                  <NavLink to="/signup">Crear Cuenta</NavLink>
                  <NavLink to="/signin">Iniciar Sesión</NavLink>
                  {
                    user && (
                      <NavLink to="/">Usuario: {user.name.split(' ')[0]}</NavLink>
                    )
                  }
                </>
              ): (
                <>
                  <NavLink to="/cart" className="flex-row"><FaCartPlus/>
                  { 
                        cart.cartItems.length > 0 
                        ? (
                          <div className="cart__numbers">
                            {cart.cartItems.reduce((acc, item) => acc + item.cantidad, 0)}
                          </div>
                        )
                        : null
                      }
                  </NavLink>
                <NavLink to="/profile">Perfil</NavLink>
                <NavLink to="/orderhistory">Mis Ordenes</NavLink>
                <NavLink to="#signout" onClick={signoutHandler}>Cerrar Sesión</NavLink>
                {
                  user && (
                    <NavLink to="/" className="flex-row"><FaUserCircle/> {user.name.split(' ')[0]}</NavLink>
                  )
                }
                </>
              )
            }
          </div>

          <div className="secondary mini">
            <Link to="#" className="more">Más</Link>
            <div className="submenu">
            <NavLink to="/profile">Perfil</NavLink>
            <NavLink to="/orderhistory">Mis Ordenes</NavLink>
            <NavLink to="/login">Cerrar Sesión</NavLink>
            </div>
          </div>

        </div>
        
      </nav>
    </header>
  )
}

export default HeaderComponent