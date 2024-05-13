import { createContext, useState } from 'react';
import './App.css';
import Theme from './components/theme/Theme';
import Home from './pages/homepage/Home';

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? {backgroundColor : "#feb300"} : {}}>
        <Theme />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
