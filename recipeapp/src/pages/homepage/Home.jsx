import React from 'react';
import Search from '../../components/Search';
import './styles.css';
function Home() {
  const getDataFromSearchComponent = (getData) => {
    // console.log(getData);
    //Data fetching
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=20dbb71b8e104f758aa5284ccd046211&query=${getData}`
      );
      const result = await apiResponse.json();

      console.log(result);
    }

    getRecipes();
  };

  return (
    <div className="home">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />
    </div>
  );
}

export default Home;
