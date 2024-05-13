import React, { useContext } from 'react';
import '../favorites/favorite.css';
import { ThemeContext } from '../../App';

function Favorite(props) {
  const { id, image, title, removeFromFavorites } = props;

  const { theme } = useContext(ThemeContext);
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} />
      </div>
      <p>{title}</p>
      <button
        style={theme ? { backgroundColor: '#12343b' } : {}}
        onClick={removeFromFavorites}
      >
        Remove From Favorites
      </button>
    </div>
  );
}

export default Favorite;
