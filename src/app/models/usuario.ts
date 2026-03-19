import { Universidad } from "./universidad";

export interface Usuario {
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'user';
    universidad?: Universidad;
}
