import React from 'react';
import '../favorites/favorite.css';

function Favorite(props) {
  const { id, image, title, removeFromFavorites } = props;
  console.log(props, 'recipes');
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} />
      </div>
      <p>{title}</p>
      <button onClick={removeFromFavorites}>Remove From Favorites</button>
    </div>
  );
}

export default Favorite;
