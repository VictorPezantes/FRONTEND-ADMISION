import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Postulante } from '../../admision.interface';
import { BehaviorSubject, merge, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { CreatePostulantComponent } from '../../components/create-postulant/create-postulant.component';
import { PostulacionesService } from '../../containers/postulaciones/postulaciones.service';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.scss']
})
export class ViewInformationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Postulante[] = [{
    apellidoMaterno: "RAMIREZ"
    ,
    apellidoPaterno: "TORRES"
    ,
    celular: "98658758"
    ,
    celularFamiliar: "98563252"
    ,
    direccion: "CALLE A"
    ,
    disponibilidadViajar: 1
    ,
    dni: "48568578"
    ,
    email: "CORR@CORR.COM"
    ,
    emailSecundario: "CORR@CORR.COM"
    ,
    empresaCurso: "DEC"
    ,
    empresaTrabajoReciente: "DEC"
    ,
    estado: 1
    ,
    estadoPostulacion: 1
    ,
    experienciaRubro: 1
    ,
    fechaIngresoTrabajoReciente: "15/09/2022"
    ,
    fechaNacimiento: "06/09/2022"
    ,
    fechaPostulacion: "05/09/2022"
    ,
    fechaSalidaTrabajoReciente: "29/09/2022"
    ,
    id: 1
    ,
    idDepartamento: 1
    ,
    idDistrito: 1
    ,
    idEstadoCivil: 1
    ,
    idOferta: 1
    ,
    idProvincia: 1
    ,
    lugarEstudios: "DEC"
    ,
    motivoSalidaTrabajoReciente: "DEC"
    ,
    ofertaPostulada: "1"
    ,
    primerNombre: "jUAN"
    ,
    procedencia: "CIVIL"
    ,
    profesion: "NARCO"
    ,
    segundoNombre: "MANUEL"
    ,
    telefonoFijo: null
    ,
    trabajoReciente: "ESVIC"
    ,
    ultimoCursoRealizado: "AYER"
    ,
    urlCurriculumVitae: null
    ,
    urlDniFrontal: null
    ,
    urlDniPosterior: null
    ,
    urlFotografia: null
  }];

  displayedColumns: string[] = ['imagen', 'informacion', 'cargo'];
  displayedColumns1: string[] = ['celular', 'celularfamiliar', 'emailsecundario'];
  displayedColumns2: string[] = ['domicilio', 'estadocivil', 'fechanacimiento', 'experiencia', 'disponibilidad'];
  displayedColumns3: string[] = ['responsable'];
  count = 0;



  constructor(

    private _postulacionService: PostulacionesService,
    private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Información del Postulante');
  }




  ngOnInit(): void {

    /* this.listarPostulante();*/
  }

  ngAfterViewInit(): void {
    console.log(this.dataSource)
    /*this.paginator._intl.itemsPerPageLabel = 'Items por página.';*/

    /*this.initPagination();*/
  }

  /* initPagination(): void {
     merge(this.paginator.page, this.changesSubject, this._postulacionService.eventFilters)
       .pipe(
         switchMap(() => {
           this._ngxSpinner.show();
           const rawValue = this._postulacionService.eventFilters.value;
           const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
           const queryParamsByPaginator = { ...filters } as any;
           queryParamsByPaginator.limit = this.paginator.pageSize;
           queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
           return this._postulacionService.get(queryParamsByPaginator);
         })
       ).subscribe((response) => {
         this._ngxSpinner.hide();
         this.count = response.count;
         this.dataSource = response.content;
         console.log(this.dataSource);
         moment.locale('es');
         const date = moment().add(this.dataSource?.[0]?.fechaIngresoTrabajoReciente);
         let dateInFormat = date.format('MMM YYYY');
         console.log(dateInFormat);
 
         
 
       });
   }*/



  listarPostulante(): void {
    this._postulacionService.get().subscribe((reponse: any) => {
      this.dataSource = reponse.content;
      console.log(this.dataSource)
    });

  }
}
