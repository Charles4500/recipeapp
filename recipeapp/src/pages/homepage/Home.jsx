import React from 'react'
import Search from '../../components/Search';
import './styles.css'
function Home() {
  function getDataFromSearchComponent (getData){
    console.log(getData);
  }
  return (
    <div className='home'>
      <Search getDataFromSearchComponent = {getDataFromSearchComponent}/>
    </div>
  )
}

export default Home;