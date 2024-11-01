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
        const newSocket = io('https://opalescent-proximal-lantana.glitch.me/');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
            newSocket.emit('unirseSala', idSala);
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
            promotion: 'q',
        });

        if (move === null) return false;

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

    return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}

export default JuegoAjedrez;
