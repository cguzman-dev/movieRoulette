import { createContext, useEffect, useState, type ReactNode } from "react";

export const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {}
  });
  
  export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    
    useEffect(() => {
      document.body.className = isDark ? 'dark-theme' : 'light-theme';
    }, [isDark]);
  
    return (
      <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
        {children}
      </ThemeContext.Provider>
    );
  };