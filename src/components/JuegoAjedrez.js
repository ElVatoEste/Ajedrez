// components/JuegoAjedrez.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { io } from 'socket.io-client';
import { Chess } from 'chess.js';

function JuegoAjedrez() {
    const { idSala } = useParams();
    const [game, setGame] = useState(new Chess());
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('https://server-ashy-omega.vercel.app/'); // Reemplaza con la URL de tu servidor
        setSocket(newSocket);

        newSocket.emit('unirseSala', idSala);

        newSocket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
        });

        newSocket.on('movimiento', (movimiento) => {
            const { from, to, promotion } = movimiento;
            const move = game.move({ from, to, promotion });
            if (move) {
                setGame(new Chess(game.fen()));
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [game, idSala]);

    const onDrop = (sourceSquare, targetSquare) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q', // Siempre promociona a reina por simplicidad
        });

        if (move === null) return false; // Movimiento ilegal

        setGame(new Chess(game.fen()));

        if (socket) {
            socket.emit('movimiento', {
                idSala,
                movimiento: {
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: 'q',
                },
            });
        }

        return true;
    };

    return (
        <div>
            <h2>Sala: {idSala}</h2>
            <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
    );
}

export default JuegoAjedrez;


