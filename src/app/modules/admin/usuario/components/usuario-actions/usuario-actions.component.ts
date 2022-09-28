import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../usuario.service';

@Component({
  selector: 'app-usuario-actions',
  templateUrl: './usuario-actions.component.html',
  styleUrls: ['./usuario-actions.component.scss']
})
export class UsuarioActionsComponent implements OnInit {

  constructor(
    private _userService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  createAdmin(): void {
    this._userService.eventCreateU.next();
  }

}
