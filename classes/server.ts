
import express from 'express';
import { SERVER_PORT } from '../global/environment';
//Configuración de la conexión de los sockets
import socketIO from 'socket.io';
import http from 'http';

import * as sock from '../sockets/sockets';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;

    // Propiedad encargada de eventos de los sockets
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        // Servidor de sockets
        // No nos vale con el de express, tiene que ser el http de node
        this.io = socketIO( this.httpServer );

        this.listenSockets();
    }

    /**
     * Singleton instance.
     */ 
    public static get instance() {
        return this._instance || (this._instance = new this());
    }


    private listenSockets() {

        console.log('Escuchando conexiones...');
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            // Conectar cliente
            sock.conectarCliente(cliente);

            // Configurar usuario
            sock.configUser(cliente, this.io);

            // Mensajes
            sock.mensaje(cliente, this.io);

            // Desconectar
            sock.desconectar(cliente);
        });
    }

    /**
     * Start the server listening.
     * @param callback Callback to call
     */
    start( callback: () => void) {
        //this.app.listen(this.port, callback);
        this.httpServer.listen(this.port, callback);
    }
}