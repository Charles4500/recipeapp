import React, { useContext } from 'react';
import '../render/styling.css';
import { ThemeContext } from '../../App';

function RecipeItem(props) {
  const { id, image, title, addToFavorites } = props;

  const {theme} = useContext(ThemeContext);
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} />
      </div>
      <p style={theme ? { color: '#12343b' } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: '#12343b' } : {}}
        onClick={addToFavorites}
      >
        Add To Favorites
      </button>
    </div>
  );
}

export default RecipeItem;
