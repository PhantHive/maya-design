import './components/Body';
import { Body } from './components/Body.tsx';
import { Header } from './components/Header.tsx';

function App() {
    return (
        <>
            <div className="App">
                <Header />
                <Body />
            </div>
        </>
    );
}

export default App;
