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
    }

    ngAfterViewInit(): void {
        console.log(this.dataSource)
    }

    listarPostulante(): void {
        this._postulacionService.get().subscribe((reponse: any) => {
            this.dataSource = reponse.content;
            console.log(this.dataSource)
        });

    }
}
