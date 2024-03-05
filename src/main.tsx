import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './styles/body.scss';
import './styles/header.scss';

const root = ReactDOM.createRoot(document.querySelector('#root') as Element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
