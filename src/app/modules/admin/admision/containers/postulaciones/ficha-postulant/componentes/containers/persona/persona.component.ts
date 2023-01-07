import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

    formActions: FormGroup;
    @Output() messagePersona = new EventEmitter<any>();
  constructor(
    
    private _fb: UntypedFormBuilder
  ){
this.createFormActions();
  }

  ngOnInit(): void {
    
    this.formActions = this._fb.group({
        //Datos Personales

        primerNombre: [null, [Validators.required]],
        segundoNombre: [null],
        apellidoMaterno: [null, [Validators.required]],
        apellidoPaterno: [null]

    });
  }


  createFormActions():void{

    this.formActions = this._fb.group({
        //Datos Personales

        primerNombre: [null, [Validators.required]],
        segundoNombre: [null],
        apellidoPaterno: [null, [Validators.required]],
        apellidoMaterno: [null]

    });
  }
}
