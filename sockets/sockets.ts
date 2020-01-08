import { Socket } from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

// Instancia de los usuarios conectados
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: SocketIO.Server) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = ( cliente: Socket, io: SocketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Escuchar mensajes
export const mensaje = ( cliente :Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });

}

// Configurar usuario
export const configUser = ( cliente :Socket, io: SocketIO.Server) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string}, callback: Function) => {
        console.log('Configurar usuario', payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}

// Obtener usuarios para un cliente concreto
export const obtenerUsers = ( cliente :Socket, io: SocketIO.Server) => {
    cliente.on('get-users', ( ) => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}