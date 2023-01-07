import { Component, Input, OnInit } from "@angular/core";
import { AdmisionService } from "../../../admision.service";
import { PostulacionesService } from '../postulaciones.service';

@Component({
  selector: "app-ficha-postulant",
  templateUrl: "./ficha-postulant.component.html",
  styleUrls: ["./ficha-postulant.component.scss"],
})
export class FichaPostulantComponent implements OnInit {
  _variableprueba: string ='juanito';
  constructor(private _admisionService: AdmisionService,
    private _requestService:PostulacionesService
    ) {
    this._admisionService.title.next("Ficha de Datos Personales");
  }

  ngOnInit(): void {}

  @Input()
  set registros(value: string) {
    this._variableprueba = value;
  }

  eventCreate(): void {
    console.log("Boton enviar");
    this._requestService.eventCreate.next();
    console.log("Boton enviar", this._requestService.eventCreate.next());
  }

  cancelOffer(): void {
    // alert("alerta")
  }
}
