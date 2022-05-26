import React, { useState } from 'react';

const ThemeContext = React.createContext({
    theme: '',
    toggleTheme: () => { }
});

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('okaidia');

    const toggleTheme = () => {
        setTheme(prev => prev === 'okaidia' ? 'tomorrow' : 'okaidia')
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;