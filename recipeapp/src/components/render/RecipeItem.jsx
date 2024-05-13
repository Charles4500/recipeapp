import React from 'react';

function RecipeItem(props) {
  const { id, image, title } = props;
  console.log(props, 'recipes');
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} />
      </div>
      <p>{title}</p>
      <button>Add To Favourites</button>
    </div>
  );
}

export default RecipeItem;
