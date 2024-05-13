import React, { useState } from 'react';
import Search from '../../components/Search';
import './styles.css';
function Home() {
  //Loading state
  const [loadingState, setLoadingState] = useState(false);

  //Save results that we receive from the api
  const [recipes, setRecipes] = useState([]);

  const getDataFromSearchComponent = (getData) => {
    //Keep the loading state as true before calling the api
    setLoadingState(true);

    //Data fetching
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=20dbb71b8e104f758aa5284ccd046211&query=${getData}`
      );
      const result = await apiResponse.json();

      // console.log(result);
      const { results } = result;

      if (results && results.length > 0) {
        //set loading state here as false again
        setLoadingState(false);

        //set the recipes state
        setRecipes(results);
      }
    }

    getRecipes();
  };
console.log(loadingState,recipes);
  return (
    <div className="home">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />
    </div>
  );
}

export default Home;
