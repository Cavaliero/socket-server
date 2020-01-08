import { Usuario } from "./usuario";

// Lógica de todos los usuarios
export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor(){}

    /**
     * Agregar un usuario
     * @param usuario Usuario a añadir
     */
    public agregar (usuario: Usuario): Usuario {
        this.lista.push(usuario);
        return usuario;
    }

    /**
     * Actualizar nombre de un usuario ya guardado
     * @param id Id del usuario
     * @param nombre Nombre a cambiar
     */
    public actualizarNombre(id: string, nombre: string) {
        for ( let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
    }

    /**
     * Obtener lista de usuarios
     */
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== undefined);
    }

    /**
     * Obtener un usuario por id
     * @param id Id del usuario
     */
    public getUsuario(id: string) {
        return this.lista.find((user) => user.id === id)
    }

    /**
     * Obtener usuarios de una sala
     * @param sala Sala en particular
     */
    public getUsuariosSala( sala: string) {
        return this.lista.filter( user => user.sala === sala);
    }

    /**
     * Borrar usuario
     * @param id Id del usuario a borrar
     */
    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario( id );

        this.lista = this.lista.filter( user => user.id !== id);
        return tempUser;
    }
}