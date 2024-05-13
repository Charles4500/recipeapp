import React from 'react';
import '../render/styling.css';
function RecipeItem(props) {
  const { id, image, title, addToFavorites } = props;
  console.log(props, 'recipes');
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} />
      </div>
      <p>{title}</p>
      <button onClick={addToFavorites}>Add To Favorites</button>
    </div>
  );
}

export default RecipeItem;
