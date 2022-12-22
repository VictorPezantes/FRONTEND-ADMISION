import { Component, Input, OnInit } from "@angular/core";
import { AdmisionService } from "../../../admision.service";

@Component({
  selector: "app-ficha-postulant",
  templateUrl: "./ficha-postulant.component.html",
  styleUrls: ["./ficha-postulant.component.scss"],
})
export class FichaPostulantComponent implements OnInit {
  _variableprueba: string ='juanito';
  constructor(private _admisionService: AdmisionService) {
    this._admisionService.title.next("Ficha de Datos Personales");
  }

  ngOnInit(): void {}

  @Input()
  set registros(value: string) {
    this._variableprueba = value;
  }
}
