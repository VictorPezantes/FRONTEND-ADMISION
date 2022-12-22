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
    roles?: Array<Roles>;
    authorities?: {
        authority: string
    }[];
}
export interface Roles
{
    id?: string;
    rolNombre?: string;
    
}
export interface usuario{
  nombres: string,
  apellidos:string,
  correo?: string,
  rol:string,
  img:string;
}