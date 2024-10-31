// App.tsx
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Background />
            <Header />
            <Body />
            <Footer />
        </ThemeProvider>
    );
};

export default App;