import React, { useContext, useState } from 'react'
import ProductsContext from '../context/products/productsContext';

const SearchProductComponent = () => {
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
    <form 
      className="search__product"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search product by name"
        name="product"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <input type="submit" value="Search" />
    </form>
  )
}

export default SearchProductComponent