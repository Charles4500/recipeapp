import React, { useState } from 'react';
import './search/style.css';
function Search({getDataFromSearchComponent}) {
  const [inputValue, setInputValue] = useState('');
  function handleInputChange(event){
    const {value} =event.target;
    setInputValue(value)
    // console.log(value);
  }
  function handleSubmit(event){
    event.preventDefault()
    getDataFromSearchComponent(inputValue)
  }
  
  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        placeholder="Search recipe here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
