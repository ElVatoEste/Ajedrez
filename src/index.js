import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'; // Añadir la extensión .js
import reportWebVitals from './reportWebVitals.js'; // Añadir la extensión .js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes pasar una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o enviar a un endpoint de análisis. Más información: https://bit.ly/CRA-vitals
reportWebVitals();
