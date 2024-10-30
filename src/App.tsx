import React, { useContext, useEffect, useState } from 'react';
import './components/Body';
import { Body } from './components/Body.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import ConsentBanner from './components/Consent.tsx';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext.tsx';

const App: React.FC = () => {
    const [showConsent, setShowConsent] = useState(false);
    const { theme } = useContext(ThemeContext);

    const giveConsent = () => {
        document.cookie = 'consent=true; path=/';
        setShowConsent(false);
    };

    useEffect(() => {
        const consentGiven = document.cookie
            .split('; ')
            .find((row) => row.startsWith('consent='));
        if (!consentGiven) {
            setShowConsent(true);
        }
    }, []);

    useEffect(() => {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', setVh);
        setVh();

        return () => {
            window.removeEventListener('resize', setVh);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            <div className="App">
                <ThemeProvider>
                    {showConsent && <ConsentBanner giveConsent={giveConsent} />}
                    <Header />
                    <Body />
                    <Footer />
                </ThemeProvider>
            </div>
        </>
    );
};

export default App;