import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import './styles/body.scss';
import './styles/header.scss';
import './styles/footer.scss';

const root = ReactDOM.createRoot(document.querySelector('#root') as Element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
