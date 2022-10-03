export interface User
{
    id?: number;
    name?: string;
    nombre?: string;
    apellidos?: string;
    email?: string;
    nombreUsuario?: string;
    role?: any;
    rol?: any;
    avatar?: string;
    fotografia?: string;
    status?: string;
    roles?: any;
    authorities?: {
        authority: string
    }[];
}
