import './components/Body';
import { Body } from './components/Body.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { useEffect } from 'react';

function App() {
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

    return (
        <>
            <div className="App">
                <Header />
                <Body />
                <Footer />
            </div>
        </>
    );
}

export default App;
