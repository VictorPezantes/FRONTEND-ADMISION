import { Component, OnInit } from '@angular/core';
import { AdmisionService } from '../../../admision.service';

@Component({
  selector: 'app-history-postulant',
  templateUrl: './history-postulant.component.html',
  styleUrls: ['./history-postulant.component.scss']
})
export class HistoryPostulantComponent implements OnInit {

  dataSource = [{
    apellidoMaterno: "RAMIREZ",
    apellidoPaterno: "TORRES",
    celular: "98658758",
    celularFamiliar: "98563252",
    direccion: "CALLE A",
    disponibilidadViajar: 1,
    dni: "48568578",
    email: "CORR@CORR.COM",
    emailSecundario: "CORR@CORR.COM",
    empresaCurso: "DEC",
    empresaTrabajoReciente: "DEC",
    estado: 1,
    estadoPostulacion: 1,
    experienciaRubro: 1,
    fechaIngresoTrabajoReciente: "15/09/2022",
    fechaNacimiento: "06/09/2022",
    fechaPostulacion: "05/09/2022",
    fechaSalidaTrabajoReciente: "29/09/2022",
    id: 1,
    idDepartamento: 1,
    idDistrito: 1,
    idEstadoCivil: 1,
    idOferta: 1,
    idProvincia: 1,
    lugarEstudios: "DEC",
    motivoSalidaTrabajoReciente: "DEC",
    ofertaPostulada: "1",
    primerNombre: "jUAN",
    procedencia: "CIVIL",
    profesion: "NARCO",
    segundoNombre: "MANUEL",
    telefonoFijo: null,
    trabajoReciente: "ESVIC",
    ultimoCursoRealizado: "AYER",
    urlCurriculumVitae: null,
    urlDniFrontal: null,
    urlDniPosterior: null,
    urlFotografia: null
  }];
  displayedColumns: string[] = ['imagen', 'informacion', 'cargo', 'responsable'];

  dataHmedico = [
    { position: 1, name: 'Medico', weight: 1.0079, symbol: 'H' },
  ];
  ColumnsHmedico: string[] = ['position', 'name', 'weight', 'symbol'];

  dataEntrevista = [
    { position: 1, name: 'Entrevista', weight: 1.0079, symbol: 'H' },
  ];
  ColumnsEntrevista: string[] = ['position', 'name', 'weight', 'symbol'];

  dataEvaluaciones = [
    { position: 1, name: 'Evaluaciones', weight: 1.0079, symbol: 'H' },
  ];
  ColumnsEvaluaciones: string[] = ['position', 'name', 'weight', 'symbol'];

  dataPostulalcion = [
    { position: 1, name: 'Postulacion', weight: 1.0079, symbol: 'H' },
  ];
  ColumnsPostulalcion: string[] = ['position', 'name', 'weight', 'symbol'];

  dataEstados = [
    { position: 1, name: 'Estados', weight: 1.0079, symbol: 'H' },
  ];
  ColumnsEstados: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Historial de proceso de postulación');
  }

  ngOnInit(): void {
  }

}
