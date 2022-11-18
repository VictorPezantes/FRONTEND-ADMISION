import { MatDateFormats } from "@angular/material/core";

export interface Oferta {
    CargoPostular: string;
    cantidadPostulantes: number;
    creador: string;
    descripcion: string;
    estado: string;
    fechaActualización: string;
    fechaCreacion: string;
    fechaDesactivado: string;
    fechaPublicacion: string;
    id: number;
    requisito: string;
    titulo: string;
}


export interface Postulante {
    id: number;
    primerNombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    idEstadoCivil: number;
    dni: string;
    fechaNacimiento: string;
    direccion: string;
    Distrito: string;
    Provincia: string;
    Departamento: string;
    celular: string;
    celularFamiliar: string;
    telefonoFijo: string;
    email: string;
    emailSecundario: string;
    profesion: string;
    lugarEstudios: string;
    ultimoCursoRealizado: string;
    empresaCurso: string;
    trabajoReciente: string;
    fechaIngresoTrabajoReciente: string;
    fechaSalidaTrabajoReciente: string;
    empresaTrabajoReciente: string;
    motivoSalidaTrabajoReciente: string;
    disponibilidadViajar: number;
    experienciaRubro: number;
    estadoPostulacion: number;
    fechaPostulacion: string;
    procedencia: string;
    idOferta: number;
    ofertaPostulada: string;
    estado: number;
    estadoPostulanteId: number;
    encargadoNombre: string;
    encargadoTelefono: string;
    encargadoEmail: string;
}