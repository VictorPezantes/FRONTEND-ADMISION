import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../solicitud.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AbstractChoice, Departamento, Distrito, Provincia } from '../../../../../shared/interfaces/common.interface';
import { CommonService } from '../../../../../shared/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfertasLaboralesComponent } from 'app/modules/landing/admision/containers/ofertas-laborales/ofertas-laborales.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-registrar-postulacion',
    templateUrl: './registrar-postulacion.component.html',
    styleUrls: ['./registrar-postulacion.component.scss']
})
export class RegistrarPostulacionComponent implements OnInit {

    formActions: FormGroup;
    civilStatus$: Observable<AbstractChoice[]>;
    departamento: Departamento[] = [];
    //provincia: Provincia[];

    //idOfertas: string = '';
    //tituloOferta: string = '';

    provincia: Provincia[] = [
        { id: 1, name: "Lima Provincia" },
        { id: 2, name: "Callao Provincia" }
    ];

    distrito: Distrito[] = [
        { id: 1, name: "Lima Distrito" },
        { id: 2, name: "Callao Distrito" }
    ];

    id: string;
    titulo: string;

    unsubscribe = new Subject<void>();

    formData = new FormData();

    constructor(
        private _fb: UntypedFormBuilder,
        private _ngxSpinnerService: NgxSpinnerService,
        private _requestService: SolicitudService,
        private _commonService: CommonService,
        private _snackService: MatSnackBar,
        private router: Router, private activatedRoute: ActivatedRoute
        //private _ofertaLaboral: OfertasLaboralesComponent
    ) {
        this.createFormActions();
    }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.paramMap.get('id') && this.activatedRoute.snapshot.paramMap.get('titulo')) {
            this.id = this.activatedRoute.snapshot.paramMap.get('id')
            this.titulo = this.activatedRoute.snapshot.paramMap.get('titulo')
            console.log("Recibiendo parámetros id y título desde registro: " + this.id + " - " + this.titulo)
        }

        this.civilStatus$ = this._commonService.getCivilStatus({ paginated: false });
        this._commonService.getDepartamento().subscribe(departament => { this.departamento = departament; });
        //this._commonService.getProvincia().subscribe(provincia => { this.provincia = provincia; });

        //console.log(this._ofertaLaboral.idofertas)

        this._requestService.eventCreate
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => {
                this.createRequest();
            });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            // Datos Personales
            primerNombre: [null, [Validators.required]],
            segundoNombre: [null],
            apellidoPaterno: [null, [Validators.required]],
            apellidoMaterno: [null],
            dni: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
            idEstadoCivil: [null, [Validators.required]],
            fechaNacimiento: [null, [Validators.required]],
            direccion: [null, [Validators.required]],
            idDepartamento: [null, [Validators.required]],
            idProvincia: [null, [Validators.required]],
            idDistrito: [null, [Validators.required]],
            telefonoFijo: [null],
            // Datos de Contacto
            celular: [null, [Validators.required]],
            celularFamiliar: [null],
            email: [null, [Validators.required, Validators.email]],
            emailSecundario: [null, [Validators.email]],
            // Datos Academicos
            profesion: [null],
            lugarEstudios: [null],
            ultimoCursoRealizado: [null],
            empresaCurso: [null],
            // Datos laborales
            trabajoReciente: [null],
            fechaIngresoTrabajoReciente: [null],
            fechaSalidaTrabajoReciente: [null],
            empresaTrabajoReciente: [null],
            motivoSalidaTrabajoReciente: [null],
            //ANEXAR DOCUMENTOS 
            curriculum: [null, [Validators.required]],
            dniFrontal: [null],
            dniPosterior: [null],
            foto: [null],
            // Opciones
            disponibilidadViajar: [null, [Validators.required]],
            experienciaRubro: [null, [Validators.required]]
        });
    }

    uploadCV(event): any {
        const cv = event.target.files[0];
        this.formData.append('curriculum', cv);
        console.log(cv);
    }

    uploadDNI1(event): any {
        const img1 = event.target.files[0];
        this.formData.append('dniFrontal', img1);
    }

    uploadDNI2(event): any {
        const img2 = event.target.files[0];
        this.formData.append('dniPosterior', img2);
    }

    uploadFOTO(event): any {
        const img3 = event.target.files[0];
        this.formData.append('foto', img3);
    }

    createRequest(): void {
        if (this.formActions.valid) {
            this._ngxSpinnerService.show();
            //const payload = this.formActions.getRawValue();
            const payload = this.formActions.value;

            this.formData.append('primerNombre', payload.primerNombre);
            this.formData.append('segundoNombre', payload.segundoNombre);
            this.formData.append('apellidoPaterno', payload.apellidoPaterno);
            this.formData.append('apellidoMaterno', payload.apellidoMaterno);
            this.formData.append('dni', payload.dni);
            this.formData.append('idEstadoCivil', payload.idEstadoCivil);
            this.formData.append('fechaNacimiento', payload.fechaNacimiento);
            this.formData.append('direccion', payload.direccion);
            this.formData.append('idDepartamento', payload.idDepartamento);
            this.formData.append('idProvincia', payload.idProvincia);
            this.formData.append('idDistrito', payload.idDistrito);
            this.formData.append('telefonoFijo', payload.telefonoFijo);
            this.formData.append('celular', payload.celular);
            this.formData.append('celularFamiliar', payload.celularFamiliar);
            this.formData.append('email', payload.email);
            this.formData.append('emailSecundario', payload.emailSecundario);
            this.formData.append('profesion', payload.profesion);
            this.formData.append('lugarEstudios', payload.lugarEstudios);
            this.formData.append('ultimoCursoRealizado', payload.ultimoCursoRealizado);
            this.formData.append('empresaCurso', payload.empresaCurso);
            this.formData.append('trabajoReciente', payload.trabajoReciente);
            this.formData.append('fechaIngresoTrabajoReciente', payload.fechaIngresoTrabajoReciente);
            this.formData.append('fechaSalidaTrabajoReciente', payload.fechaSalidaTrabajoReciente);
            this.formData.append('empresaTrabajoReciente', payload.empresaTrabajoReciente);
            this.formData.append('motivoSalidaTrabajoReciente', payload.motivoSalidaTrabajoReciente);
            //this.formData.append('fechaPostulacion', payload.fechaNacimiento); //** */

            this.formData.append('disponibilidadViajar', payload.disponibilidadViajar);
            this.formData.append('experienciaRubro', payload.experienciaRubro);

            this.formData.append('estado', '1'); /** */
            this.formData.append('estadoPostulacion', '1'); /** */
            // this.formData.append('idOferta', '1');
            this.formData.append('idOferta', this.id);
            // this.formData.append('ofertaPostulada', '1');
            this.formData.append('ofertaPostulada', this.titulo);
            this.formData.append('procedencia', 'procencia');
            this.formData.append('urlCurriculumVitae', 'ruta de archivos');
            this.formData.append('urlDniFrontal', 'ruta de archivos');
            this.formData.append('urlDniPosterior', 'ruta de archivos');
            this.formData.append('urlFotografia', 'ruta de archivos');

            this.createTransaction(this.formData);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async createTransaction(payload): Promise<void> {
        try {
            await this._requestService.registerRequest(payload).toPromise();
            this._snackService.open('Solicitud registrada correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

    obtenerProvincia(option) {
        this._commonService.getProvincia(option).subscribe(provincias => {
            //this.provincia = provincias;
            //var dato = JSON.stringify(this.provincia);
            console.log(provincias);
        });
        //console.log("aqui " + option.nombre + " su estado es " + option.estado);
    }

}
