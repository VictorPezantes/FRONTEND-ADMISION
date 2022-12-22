import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User, usuario } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
    usuario:usuario;
        private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _userService:UserService
  ) {
   }
//desde aqui traigo data de usuario registrado
  ngOnInit(): void {
    // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.usuario = {
                  nombres:user.nombre,
                  apellidos: user.apellidos,
                  correo: user.email,
                  rol:user.roles[0].rolNombre=='ROLE_ADMIN'?'ADMINISTRATIVO':'POSTULANTE',
                  img:user.fotografia
                } 
            });
          
  }

}
