// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import JuegoAjedrez from './components/JuegoAjedrez.js';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sala/:idSala" element={<JuegoAjedrez />} />
            </Routes>
        </Router>
    );
}

export default App;
