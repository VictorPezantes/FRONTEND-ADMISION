import { Component, OnInit } from '@angular/core';
import { IPagination } from 'app/shared/interfaces/common.interface';
import { Subject, takeUntil } from 'rxjs';
import { Postulante } from '../../../../../admision.interface';
import { PostulacionesService } from '../../../postulaciones.service';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {


  postulante: Postulante;

  sexo: string[] = ['Masculino', 'Femenino'];
  private _postulacionesService: Subject<any> = new Subject<any>();


  constructor(
    private postulacionesService: PostulacionesService
  ) { }

  ngOnInit(): void {

    this.postulacionesService.get()
      .pipe((takeUntil(this._postulacionesService)))
      .subscribe((_postulante: IPagination<Postulante>) => {
        this.postulante = {
          id: _postulante.content[0].id,
          primerNombre: _postulante.content[0].primerNombre,
          segundoNombre: _postulante.content[0].segundoNombre,
          apellidoPaterno: _postulante.content[0].apellidoPaterno,
          apellidoMaterno: _postulante.content[0].apellidoMaterno,
          idEstadoCivil: _postulante.content[0].idEstadoCivil,
          dni: _postulante.content[0].dni,
          fechaNacimiento: _postulante.content[0].fechaNacimiento,
          direccion: _postulante.content[0].direccion,
          idDistrito: _postulante.content[0].idDistrito,
          idProvincia: _postulante.content[0].idProvincia,
          idDepartamento: _postulante.content[0].idDepartamento,
          celular: _postulante.content[0].celular,
          celularFamiliar: _postulante.content[0].celularFamiliar,
          telefonoFijo: _postulante.content[0].telefonoFijo,
          email: _postulante.content[0].email,
          emailSecundario: _postulante.content[0].emailSecundario,
          profesion: _postulante.content[0].profesion,
          lugarEstudios: _postulante.content[0].lugarEstudios,
          ultimoCursoRealizado: _postulante.content[0].ultimoCursoRealizado,
          empresaCurso: _postulante.content[0].empresaCurso,
          trabajoReciente: _postulante.content[0].trabajoReciente,
          fechaIngresoTrabajoReciente: _postulante.content[0].fechaIngresoTrabajoReciente,
          fechaSalidaTrabajoReciente: _postulante.content[0].fechaSalidaTrabajoReciente,
          empresaTrabajoReciente: _postulante.content[0].empresaTrabajoReciente,
          motivoSalidaTrabajoReciente: _postulante.content[0].motivoSalidaTrabajoReciente,
          disponibilidadViajar: _postulante.content[0].disponibilidadViajar,
          experienciaRubro: _postulante.content[0].experienciaRubro,
          estadoPostulacion: _postulante.content[0].estadoPostulacion,
          fechaPostulacion: _postulante.content[0].fechaPostulacion,
          procedencia: _postulante.content[0].procedencia,
          idOferta: _postulante.content[0].idOferta,
          ofertaPostulada: _postulante.content[0].ofertaPostulada,
          urlCurriculumVitae: _postulante.content[0].urlCurriculumVitae,
          urlDniFrontal: _postulante.content[0].urlDniFrontal,
          urlDniPosterior: _postulante.content[0].urlDniPosterior,
          urlFotografia: _postulante.content[0].urlFotografia,
          estado: _postulante.content[0].estado,
          sexo: _postulante.content[0].sexo
        }
        console.log(this.postulante);
        
      });

  }

}
