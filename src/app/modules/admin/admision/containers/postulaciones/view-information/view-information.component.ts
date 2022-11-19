import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Postulante } from '../../../admision.interface';
import { BehaviorSubject, merge, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../../shared/services/message-provider.service';
import { FormUtils } from '../../../../../../shared/utils/form.utils';
import { CreatePostulantComponent } from '../../../components/create-postulant/create-postulant.component';
import { PostulacionesService } from '../postulaciones.service';

@Component({
    selector: 'app-view-information',
    templateUrl: './view-information.component.html',
    styleUrls: ['./view-information.component.scss']
})
export class ViewInformationComponent implements OnInit, OnDestroy {

    //@Input() dataEntrante:any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    fotoPostulante: string = "";
    dataSource: Postulante[];

    /*dataSource: Postulante[] = [{
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
    }];*/

    displayedColumns: string[] = ['imagen', 'informacion', 'cargo'];
    displayedColumns1: string[] = ['celular', 'celularfamiliar', 'emailsecundario'];
    displayedColumns2: string[] = ['domicilio', 'estadocivil', 'fechanacimiento', 'experiencia', 'disponibilidad'];
    displayedColumns3: string[] = ['responsable'];
    count = 0;

    //idPost: any[];

    constructor(
        private _postulacionService: PostulacionesService,
        private _admisionService: AdmisionService,
    ) {
        this._admisionService.title.next('Información del Postulante');
    }

    ngOnInit(): void {
        const aux = this._admisionService.postulante;

        this._postulacionService.getPhoto(aux.id).subscribe((reponse) => {
            this.fotoPostulante = reponse.data;
            //console.log(this.fotoPostulante)
        });

        this.dataSource = [{
            apellidoMaterno: aux.apellidoMaterno,
            apellidoPaterno: aux.apellidoPaterno,
            celular: aux.celular,
            celularFamiliar: aux.celularFamiliar,
            direccion: aux.direccion,
            disponibilidadViajar: aux.disponibilidadViajar,
            dni: aux.dni,
            email: aux.email,
            emailSecundario: aux.emailSecundario,
            empresaCurso: aux.empresaCurso,
            empresaTrabajoReciente: aux.empresaTrabajoReciente,
            estado: aux.estado,
            estadoPostulacion: aux.estadoPostulacion,
            experienciaRubro: aux.experienciaRubro,
            fechaIngresoTrabajoReciente: aux.fechaIngresoTrabajoReciente,
            fechaNacimiento: aux.fechaNacimiento,
            fechaPostulacion: aux.fechaPostulacion,
            fechaSalidaTrabajoReciente: aux.fechaSalidaTrabajoReciente,
            id: aux.id,
            Departamento: aux.departamentoDescripcion,
            Distrito: aux.distritoDescripcion,
            Provincia: aux.provinciaDescripcion,
            idEstadoCivil: aux.idEstadoCivil,
            idOferta: aux.idOferta,
            lugarEstudios: aux.lugarEstudios,
            motivoSalidaTrabajoReciente: aux.motivoSalidaTrabajoReciente,
            ofertaPostulada: aux.ofertaPostulada,
            primerNombre: aux.primerNombre,
            procedencia: aux.procedencia,
            profesion: aux.profesion,
            segundoNombre: aux.segundoNombre,
            telefonoFijo: aux.telefonoFijo,
            trabajoReciente: aux.trabajoReciente,
            ultimoCursoRealizado: aux.ultimoCursoRealizado,
            estadoPostulanteId: aux.estadoPostulanteId,
            encargadoNombre: aux.encargadoNombre,
            encargadoTelefono: aux.encargadoTelefono,
            encargadoEmail: aux.encargadoEmail
        }];

    }

    async getPhotos(payload): Promise<void> {
        try {
            const mensaje = await this._postulacionService.getPhoto(payload).toPromise();
            this.fotoPostulante = mensaje.data;
            //console.log(this.fotoPostulante);
        } catch (err) {
            console.log('Error para obtuvo foto');
        }
    }

    ngAfterViewInit(): void {
        //console.log(this.dataSource)
    }

    listarPostulante(): void {
        /*this._postulacionService.get().subscribe((reponse: any) => {
            this.dataSource = reponse.content;
            console.log(this.dataSource)
        });*/

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
