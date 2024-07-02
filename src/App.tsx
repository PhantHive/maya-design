import './components/Body';
import { Body } from './components/Body.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        // Calculate the actual viewport height and set it as a CSS variable
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Listen to the resize event and recalculate the viewport height when necessary
        const handleResize = () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
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
