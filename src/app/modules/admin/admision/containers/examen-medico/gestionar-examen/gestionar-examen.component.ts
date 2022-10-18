import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { centroMedico, TipoExamen } from 'app/shared/interfaces/common.interface';
import moment from 'moment';
import { Postulante } from '../../../admision.interface';
import { PostulacionesService } from '../../postulaciones/postulaciones.service';

@Component({
  selector: 'app-gestionar-examen',
  templateUrl: './gestionar-examen.component.html',
  styleUrls: ['./gestionar-examen.component.scss']
})
export class GestionarExamenComponent implements OnInit {

  formActions: FormGroup;

  /*postulantes = new FormControl('');
  tipoExamen = new FormControl('');
  centroMedico = new FormControl('');
  fecha = new FormControl('');*/

  tipoExamenList: TipoExamen[] = [
    { id: 0, nombre: '---- SELECCIONE ----' },
    { id: 1, nombre: 'Fisico' },
    { id: 2, nombre: 'Sangre' }
  ];

  centroMedicoList: centroMedico[] = [
    { id: 0, nombre: '---- SELECCIONE ----' },
    { id: 1, nombre: 'DOS DE MAYO' },
    { id: 2, nombre: 'GOD HOPE' },
    { id: 2, nombre: 'RICARDO PALMA' }
  ];

  postulant: Postulante[] = [];

  constructor(
    private _postulacionService: PostulacionesService,
    private _fb: UntypedFormBuilder,
  ) {
    this.createFormActions();
  }

  ngOnInit(): void {
    this._postulacionService.get().subscribe(response => (this.postulant = response.content));
  }

  addExamen(): void {
    this.formActions.value.fecha = this.formActions?.value?.fecha ? moment(this.formActions?.value?.fecha).format('DD/MM/YYYY') : null;
    console.log(this.formActions?.value);
  }


  createFormActions(): void {
    this.formActions = this._fb.group({
      postulantes: ['', Validators.required],
      tipoExamen: ['', Validators.required],
      centroMedico: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  /*castToParams(filters) {
    filters.fechaPublicacion = filters?.fechaPublicacion ? moment(filters?.fechaPublicacion).format('DD/MM/YYYY') : null;
    return filters;
  }*/


}
