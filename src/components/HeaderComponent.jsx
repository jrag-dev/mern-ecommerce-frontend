import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";

import '../styles/components/HeaderComponent.css';
import { Link, NavLink } from 'react-router-dom';

const HeaderComponent = () => {

  const [openMenu, setOpenMenu] = useState(false);

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
              <NavLink to="/">Carrito</NavLink>
              <NavLink to="/">Logout</NavLink>
          </div>
        </div>

        <div className="desktop">

          <div className="logo">
            <Link to="/">Mern Ecommerce</Link>
          </div>

          <div className="primary">
            <NavLink to="/">Productos</NavLink>
            <NavLink to="/">Carrito</NavLink>
            <NavLink to="/">Logout</NavLink>
          </div>

          <div className="secondary full">
            <NavLink to="/">Perfil</NavLink>
            <NavLink to="/signup">Mis Ordenes</NavLink>
            <NavLink to="/login">Cerrar Sesión</NavLink>
          </div>

          <div className="secondary mini">
            <Link to="#" className="more">Más</Link>
            <div className="submenu">
            <NavLink to="/">Perfil</NavLink>
            <NavLink to="/signup">Mis Ordenes</NavLink>
            <NavLink to="/login">Cerrar Sesión</NavLink>
            </div>
          </div>

        </div>
        
      </nav>
    </header>
  )
}

export default HeaderComponent