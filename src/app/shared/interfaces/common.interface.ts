export interface IPagination<T> {
    count: number;
    maxPages: number;
    page: number;
    totalElements: number;
    content: Array<T>;
}

export interface IDialogData<T> {
    suggestedValidation?: boolean;
    suggestedMeta?: any;
    suggestedHour?: Date;
    suggestedHourEnd?: Date;
    type?: string;
    meta: T;
    savedState?: boolean;
}

export interface Estado {
    id: number;
    name: string;
}

export interface Departamento {
    id: number;
    name: string;
}

export interface Provincia {
    id: number;
    name: string;
}

export interface Distrito {
    id: number;
    name: string;
}

export interface Encargado {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}

export interface Cargo {
    id: number;
    name: string;
}

export interface AbstractChoice {
    id: number;
    name: string;
}

export interface Usuarios {
    id: number;
    nombre: string;
    apellidos: string;
    nombreUsuario: string;
    email: string;
}
