import React, { useContext, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import ProductsContext from '../context/products/productsContext';

import './SearchComponent.css'


const SearchComponent = () => {
  const { searchProduct } = useContext(ProductsContext);

  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() === '') {
      return ;
    }

    searchProduct(search)

    setSearch('')
  }

  return (
    <div className={`search`}>
      <form 
        className="form"
        onSubmit={handleSubmit}
      >
        <input 
          type="text" 
          name="text" 
          placeholder="Buscar produto por nombre"
          className="input-search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className="btn-search" type="submit"><FaSearch/></button>
      </form>
    </div>
  )
}

export default SearchComponent