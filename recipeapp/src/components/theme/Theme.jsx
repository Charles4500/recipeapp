import React, { useContext } from 'react';
import '../theme/theme.css';
import { ThemeContext } from '../../App';

function Theme() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <button
      style={theme ? {backgroundColor : '#12343b'} : {}}
       onClick={() => setTheme(!theme)} className="themebtn">
        Change Theme
      </button>
    </div>
  );
}

export default Theme;
