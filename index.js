//Uso de librerias
import express from 'express';
import cors from 'cors'
import { Server } from 'socket.io';

//Puerto de la aplicacion
const PORT = 5500;

const expressApp = express()
expressApp.use(cors())

//URL del mupi y el control
const httpServer = expressApp.listen(PORT, () => {
    console.table(
        {
            'Player1:': 'http://localhost:5500/player1',
            'Player2:': 'http://localhost:5500/player2',
        })
})

expressApp.use('/player1', express.static('player1-interface'))
expressApp.use('/player2', express.static('player2-interface'))

expressApp.use(express.json())

//Comportamiento del servidor
const io = new Server(httpServer, {
    path: '/real-time',
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
});

//Iniciar el servidor
io.on('connection', (socket) => {
    console.log('Usuario conectado');


    socket.on('enviar-puntaje', (p) => {
        io.emit('puntaje-recibido', p);
    });

    socket.on('enviar-elemento1', (elemento) => {
        io.emit('elemento1-recibido', elemento);
    });

    socket.on('enviar-elemento2', (elemento) => {
        io.emit('elemento2-recibido', elemento);
    });

    socket.on('enviar-tiempo', (t) => {
        io.emit('tiempo-recibido', t);
    });

    socket.on('disconnected' , () => {
        console.log('un cliente se ha desconectado');

    });
});