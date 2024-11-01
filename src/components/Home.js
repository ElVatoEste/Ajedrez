// components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Home() {
    const [codigoSala, setCodigoSala] = useState('');
    const navigate = useNavigate();

    const crearSala = () => {
        const nuevoIdSala = uuidv4(); // Genera un ID único para la sala
        navigate(`/sala/${nuevoIdSala}`);
    };

    const unirseSala = () => {
        if (codigoSala.trim() !== '') {
            navigate(`/sala/${codigoSala}`);
        }
    };

    return (
        <div>
            <h1>Bienvenido al Juego de Ajedrez en Tiempo Real</h1>
            <button onClick={crearSala}>Crear Nueva Sala</button>
            <div>
                <input
                    type="text"
                    placeholder="Código de la sala"
                    value={codigoSala}
                    onChange={(e) => setCodigoSala(e.target.value)}
                />
                <button onClick={unirseSala}>Unirse a Sala</button>
            </div>
        </div>
    );
}

export default Home;
