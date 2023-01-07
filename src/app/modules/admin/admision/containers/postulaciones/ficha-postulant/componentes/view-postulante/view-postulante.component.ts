import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import {
  AbstractChoice,
  Departamento,
  Distrito,
  IPagination,
  NivelEstudio,
  Provincia,
} from "app/shared/interfaces/common.interface";
import { CommonService } from "app/shared/services/common.service";
import { values } from "lodash";
import moment from "moment";
import { Observable, Subject, takeUntil } from "rxjs";
import { Postulante } from '../../../../../admision.interface';
import { PostulacionesService } from "../../../postulaciones.service";

interface opcion{
  value:string,
  option: string
}
@Component({
  selector: "app-view-postulante",
  templateUrl: "./view-postulante.component.html",
  styleUrls: ["./view-postulante.component.scss"],
})
export class ViewPostulanteComponent implements OnInit {
  formPostulante: FormGroup;
  
  postulante: Postulante = null;
  sexoSelected :string = 'MASCULINO';
  civilStatus$: Observable<AbstractChoice[]>;
  departamento: Departamento[] = [];
  nivelEstudios: NivelEstudio[] = [];
  provincia: Provincia[] = [];
  distrito: Distrito[] = [];
  private _postulacionesService: Subject<any> = new Subject<any>();
  date;
  day:number ;
  month:number;
  year:number;
  sexos: string[] = ['MASCULINO', 'FEMENINO'];
  grupoSanguineos$: string[] = ['A+', 'O+', 'B+', 'AB+', 'A-', 'o-', 'B-', 'AB-'];
  dni: string = "1";
  isNadar:opcion[] = [{value: "true", option: "SI"}, {value: "false", option: "NO"}];
  monedas$: string[] = ['DOLAR', 'SOLES'];
  sabeNadar:string;
  unsubscribe = new Subject<void>();
  formData = new FormData();

  constructor(
    private _fb: UntypedFormBuilder,
    private _requestService: PostulacionesService,
    private _commonService: CommonService,
  ) {
    this.createFormActions();

  }

  ngOnInit(): void {
    this._requestService.get()
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
        
         this.day=Number.parseInt(this.postulante.fechaNacimiento.split('/')[0]);
         this.month =Number.parseInt(this.postulante.fechaNacimiento.split('/')[1]);
         this.year=Number.parseInt(this.postulante.fechaNacimiento.split('/')[2]);
         console.log(this.day);  
         console.log(this.month);
         console.log(this.year);
         this.date = new FormControl(moment([this.year,this.month, this.day]));
         console.log(this.date.value);
      });

    this.civilStatus$ = this._commonService.getCivilStatus({
      paginated: false,
    });
    this._commonService.getDepartamento().subscribe(departament => { this.departamento = departament; });
    this._commonService.getNivelEstudio().subscribe(levelEstudy => { this.nivelEstudios = levelEstudy; });

    
    this._requestService.eventCreate
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((_) => {
        this.createRequest();
      });
  }


  createFormActions(): void {
    this.formPostulante = this._fb.group({
      //Datos Personales
      primerNombre: [null, [Validators.required]],
      segundoNombre: [null],
      apellidoPaterno: [null, [Validators.required]],
      apellidoMaterno: [null],

      sexo: [null, [Validators.required]],
      idEstadoCivil: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      nacionalidad: [null, [Validators.required]],
      grupoSanguineo: [null, [Validators.required]],
      sabeNadar:[null, [Validators.required]],

      domicilio:[null, [Validators.required]],
      email: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      idDistrito:[null, [Validators.required]],
      idProvincia:[null, [Validators.required]],
      idDepartamento: [null, [Validators.required]],

      lugarNacimiento: [null, [Validators.required]],
      fechaMatrimonio: [null, [Validators.required]],
    });
      /*//Documentos
      dni: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      fechaDniVencimiento:[null, [Validators.required]],
      fechaDniEmision:[null, [Validators.required]],
      lugarEmision: [null, [Validators.required]],
      ubigeo: [null, [Validators.required]],
      grupoVotacion: [null, [Validators.required]],
      
      //Datos Bancarios
       moneda: [null, [Validators.required]], 
       banco: [null, [Validators.required]], 
       cuenta: [null, [Validators.required]], 
       cci: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(20), Validators.pattern(/^-?(0|[1-21]\d*)?$/)]], 
       observacion: [null, [Validators.required]], 
       ruc: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^-?(0|[1-12]\d*)?$/)]],
       usuario: [null, [Validators.required]], 
       claveSol: [null, [Validators.required]], 

      //Datos Academicos
       nivelestudio: [null, [Validators.required]], 
       centroEducativo: [null, [Validators.required]], 
       fechaInicio: [null, [Validators.required]], 
       fechaTermino: [null, [Validators.required]], 
       direccion: [null, [Validators.required]],  


      //Datos Laborales
       trabajo: [null, [Validators.required]], 
       puesto: [null, [Validators.required]], 
       empresa: [null, [Validators.required]], 
       funciones: [null, [Validators.required]], 

      //Medidas Indumentarias
       polo: [null, [Validators.required]], 
       casaca: [null, [Validators.required]], 
       pantalon: [null, [Validators.required]], 
       overol: [null, [Validators.required]], 
       calzado: [null, [Validators.required]], 

      //Redes sociales
       nombre: [null, [Validators.required]], 
       link: [null, [Validators.required]], 

      //Contacto de emergencia
       parentezco: [null, [Validators.required]], 

      //Datos previos 
       recomendaciones: [null, [Validators.required]], 

      //Embarques
       numeroEmbarque: [null, [Validators.required]], 
       buqueEmbarcado: [null, [Validators.required]], 
       tecnicoACargo: [null, [Validators.required]],
       trabajoARealizar: [null, [Validators.required]],
       fechaEmbarque: [null, [Validators.required]],
       fechaDesembarque: [null, [Validators.required]],*/

  }

  createRequest(): void {
    if (this.formPostulante.valid) {
      const payload = this.formPostulante.value;
      //Postulante
        //datos personales
      this.formData.append("primerNombre", payload.primerNombre);
      this.formData.append("segundoNombre", payload.segundoNombre);
      this.formData.append("apellidoPaterno", payload.apellidoPaterno);
      this.formData.append("apellidoMaterno", payload.apellidoMaterno);

      this.formData.append("sexo", payload.sexo);
      this.formData.append("idEstadoCivil", payload.idEstadoCivil);
      this.formData.append("fechaNacimiento", payload.fechaNacimiento);
      this.formData.append("nacionalidad", payload.nacionalidad);
      this.formData.append("grupoSanguineo", payload.grupoSanguineo);
      this.formData.append("sabeNadar", payload.sabeNadar);

      this.formData.append("domicilio", payload.domicilio);
      this.formData.append("email", payload.email);
      this.formData.append("celular", payload.celular);
      this.formData.append("idDistrito", payload.idDistrito);
      this.formData.append("idProvincia", payload.idProvincia);
      this.formData.append("idDepartamento", payload.idDepartamento);

      this.formData.append("lugarNacimiento", payload.lugarNacimiento);
      this.formData.append("fechaMatrimonio", payload.fechaMatrimonio);

      /*documento
      this.formData.append("dni", payload.dni);
      this.formData.append("fechaDniVencimiento", payload.fechaDniVencimiento);
      this.formData.append("fechaDniEmision", payload.fechaDniEmision);
      this.formData.append("lugarEmision", payload.lugarEmision);
      this.formData.append("ubigeo", payload.ubigeo);
      this.formData.append("grupoVotacion", payload.grupoVotacion);

      Datos Bancarios
      this.formData.append("moneda", payload.moneda);
      this.formData.append("banco", payload.banco);
      this.formData.append("cuenta", payload.cuenta);
      this.formData.append("cci", payload.cci);
      this.formData.append("observacion", payload.observacion);
      this.formData.append("ruc", payload.ruc);
      this.formData.append("usuario", payload.usuario);
      this.formData.append("claveSol", payload.claveSol);

      Datos Academicos
      this.formData.append("nivelestudio", payload.nivelestudio);
      this.formData.append("centroEducativo", payload.centroEducativo);
      this.formData.append("fechaInicio", payload.fechaInicio);
      this.formData.append("fechaTermino", payload.fechaTermino);
      this.formData.append("direccion", payload.direccion);
      this.formData.append("idDistrito", payload. idDistrito);
      this.formData.append("provincia", payload.provincia);
      this.formData.append("departamento", payload.departamento);


      //Datos Laborales
      this.formData.append("trabajo", payload.trabajo);
      this.formData.append("puesto", payload.puesto);
      this.formData.append("empresa", payload.empresa);
      this.formData.append("fechaInicio", payload.fechaInicio);
      this.formData.append("fechaTermino", payload.fechaTermino);
      this.formData.append("direccion", payload.direccion);
      this.formData.append("idDistrito", payload. idDistrito);
      this.formData.append("idProvincia", payload.idProvincia);
      this.formData.append("idDepartamento", payload.idDepartamento);
      this.formData.append("funciones", payload.funciones);

      //Medidas Indumentarias
      this.formData.append("polo", payload.polo);
      this.formData.append("casaca", payload.casaca);
      this.formData.append("pantalon", payload.pantalon);
      this.formData.append("overol", payload.overol);
      this.formData.append("calzado", payload.calzado);

      //Redes sociales
      this.formData.append("nombre", payload.nombre);
      this.formData.append("link", payload.link);

      //Contacto de emergencia
      this.formData.append("parentezco", payload.parentezco);
      this.formData.append("primerNombre", payload.primerNombre);
      this.formData.append("segundoNombre", payload.segundoNombre);
      this.formData.append("apellidoPaterno", payload.apellidoPaterno);
      this.formData.append("apellidoMaterno", payload.apellidoMaterno);
      this.formData.append("celular", payload.celular);
      this.formData.append("email", payload.email);

      //Datos previos 
      this.formData.append("fechaInicio", payload.fechaInicio);
      this.formData.append("recomendaciones", payload.recomendaciones);

      //Embarques
      this.formData.append("numeroEmbarque", payload.numeroEmbarque);
      this.formData.append("buqueEmbarcado", payload.buqueEmbarcado);
      this.formData.append("tecnicoACargo", payload.tecnicoACargo);
      this.formData.append("trabajoARealizar", payload.trabajoARealizar);
      this.formData.append("fechaEmbarque", payload.fechaEmbarque);
      this.formData.append("fechaDesembarque", payload.fechaDesembarque);

*/
      console.log("payload", payload);
      //console.log("formData", this.formPostulante.value);
    }
  }

  
  obtenerProvincia(option) {
    this._commonService.getProvincia(option).subscribe(provincias => {
        this.provincia = provincias;
    });
}

obtenerDistrito(option) {
    this._commonService.getDistrito(option).subscribe(distritos => {
        this.distrito = distritos;
    });
}


}

