import React from 'react'
import './search/style.css'
function Search() {
  return (
    <form className='search'>
      <input name='search' placeholder='Search recipe here' />
      <button type='submit'>Search</button>
    </form>
  )
}

export default Search