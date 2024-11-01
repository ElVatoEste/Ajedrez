import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { io } from 'socket.io-client';
import { Chess } from 'chess.js';

function JuegoAjedrez() {
    const [game, setGame] = useState(new Chess());
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // URL del servidor de Socket.IO desplegado en Vercel
        const socketURL = 'https://server-jldhu27gc-elvatoestes-projects.vercel.app';
        const newSocket = io(socketURL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
        });

        newSocket.on('movimiento', (data) => {
            const { from, to, promotion } = data;
            const move = game.move({ from, to, promotion });
            if (move) {
                setGame(new Chess(game.fen()));
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [game]);

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
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });
        }

        return true;
    };

    return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}

export default JuegoAjedrez;
