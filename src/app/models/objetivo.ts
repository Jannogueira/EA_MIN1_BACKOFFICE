import { Usuario } from "./usuario";

export interface Fita {
    _id: string;
    descripcion: string;
    estado: boolean;
}

export interface Objetivo {
    _id: string;
    nombre: string;
    descripcion: string;
    usuario: Usuario;
    fites: Fita[];
}