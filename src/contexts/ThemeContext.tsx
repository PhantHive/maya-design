import React, { createContext, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};