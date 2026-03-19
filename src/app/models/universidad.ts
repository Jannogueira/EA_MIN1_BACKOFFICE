import { Usuario } from './usuario';

export interface Universidad {
    nombre: string;
    ubicacion: string;
    usuarios: Usuario[];
}
