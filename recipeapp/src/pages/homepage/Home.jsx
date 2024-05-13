import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import Search from '../../components/search/Search';
import './styles.css';
import RecipeItem from '../../components/render/RecipeItem';
import Favorite from '../../components/favorites/Favorite';
import { ThemeContext } from '../../App';

const reducer = (state, action) => {
  switch (action.type) {
    case 'filterFavorites':
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: '',
};
function Home() {
  //Loading state
  const [loadingState, setLoadingState] = useState(false);

  //Save results that we receive from the api
  const [recipes, setRecipes] = useState([]);

  //Favorite data state
  const [favorites, setFavorites] = useState([]);

  //State for calling api is successful or not
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  //use reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const { theme } = useContext(ThemeContext);

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
        setApiCalledSuccess(true);
      }
    }

    getRecipes();
  };
  // console.log(loadingState, recipes);

  //Adding favorite recipes
  const addToFavorites = useCallback(
    (getCurrentRecipeItem) => {
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
        window.scrollTo({ top: '0', behavior: 'smooth' });
      } else {
        alert('Item is already present in favorites');
      }
    },
    [favorites]
  );

  // console.log(favorites);

  //Removing favorite recipes
  const removeFromFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(copyFavorites);
    localStorage.setItem('favorites', JSON.stringify(copyFavorites));
  };

  //the use effect use here
  useEffect(() => {
    // console.log('Use effect in work');
    const extractFavoritesFromLocalStorage = JSON.parse(
      localStorage.getItem('favorites')
    );
    setFavorites(extractFavoritesFromLocalStorage);
  }, []);
  // console.log(favorites);

  //Filter the favorites
  const filteredFavoriteItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );
  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return recipes.map((item) => (
        <RecipeItem
          addToFavorites={() => addToFavorites(item)}
          id={item.id}
          image={item.image}
          title={item.title}
        />
      ));
    }
  }, [recipes, addToFavorites]);
  return (
    <div className="home">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />

      {/*Show favorites item*/}
      <div className="favorites-wrapper">
        <h1
          style={theme ? { backgroundColor: '#12343b' } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>

        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: 'filterFavorites', value: event.target.value })
            }
            value={filteredState.filteredValue}
            type="text"
            name="searchFavorites"
            placeholder="Search Favorites here"
          />
        </div>

        <div className="favorites">
          {!filteredFavoriteItems.length && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
              className="no-items"
            >
              No favorites found
            </div>
          )}
          {filteredFavoriteItems && filteredFavoriteItems.length > 0
            ? filteredFavoriteItems.map((item) => (
                <Favorite
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
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
        {renderRecipes()}
        {/* {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null} */}
      </div>
      {/*Map through all recipes*/}
      {!loadingState && !recipes.length && (
        <div className="no-items">No Recipes are found</div>
      )}
    </div>
  );
}

export default Home;
