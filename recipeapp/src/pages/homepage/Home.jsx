import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import './styles.css';
import RecipeItem from '../../components/render/RecipeItem';
import Favorite from '../../components/favorites/Favorite';

function Home() {
  //Loading state
  const [loadingState, setLoadingState] = useState(false);

  //Save results that we receive from the api
  const [recipes, setRecipes] = useState([]);

  //Favorite data state
  const [favorites, setFavorites] = useState([]);

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
  // console.log(loadingState, recipes);

  const addToFavorites = (getCurrentRecipeItem) => {
    // console.log(getCurrentRecipeId);
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    // console.log(index);
    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      //save the favorites in local storage
      localStorage.setItem('favorites', JSON.stringify(copyFavorites));
    } else {
      alert('Item is already present in favorites');
    }
  };
  // console.log(favorites);

  //the use effect use here
  useEffect(() => {
    // console.log('Use effect in work');
    const extractFavoritesFromLocalStorage = JSON.parse(
      localStorage.getItem('favorites')
    );
    setFavorites(extractFavoritesFromLocalStorage);
  }, []);
  // console.log(favorites);

  return (
    <div className="home">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />

      {/*Show favorites item*/}
      <div className="favorites-wrapper">
        <h1 className="favorites-title">Favorites</h1>
        <div className="favorites">
          {favorites && favorites.length > 0
            ? favorites.map((item) => (
                <Favorite id={item.id} image={item.image} title={item.title} />
              ))
            : null}
        </div>
      </div>
      {/*Show favorites item*/}

      {/*show loading state*/}

      {loadingState && <h1 className="loading">Loading Recipes please wait</h1>}

      {/*show loading state*/}

      {/*Map through all recipes*/}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
