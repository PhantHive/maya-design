// App.tsx
import React, { Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Background } from './components/Background/Background.tsx';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';

const App: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider>
                <Background />
                <Header />
                <Body />
                <Footer />
            </ThemeProvider>
        </Suspense>
    );
};

export default App;