import React from 'react'
import HeaderComponent from '../components/HeaderComponent';


import { Outlet } from 'react-router-dom';

const LayoutPublic = () => {
  return (
    <section className="app">
      <HeaderComponent/>
      <main className="main container">
        <Outlet/>
      </main>
      <footer className="footer">
        <div className="container">
          footer
        </div>
      </footer>
    </section>
  )
}

export default LayoutPublic;