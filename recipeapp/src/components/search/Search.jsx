import React, { useContext, useEffect, useState } from 'react';
import '../search/style.css';
import { ThemeContext } from '../../App';

function Search({
  getDataFromSearchComponent,
  apiCalledSuccess,
  setApiCalledSuccess,
}) {
  
  const { theme } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    const { value } = event.target;
    setInputValue(value);
    // console.log(value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  }
  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue('');
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess]);

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        placeholder="Search recipe here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button style={theme ? { backgroundColor: '#12343b' } : {}} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
