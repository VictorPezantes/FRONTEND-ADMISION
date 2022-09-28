import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'app/shared/interfaces/common.interface';
import { UsuarioService } from '../../usuario.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  constructor(
    private _usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
    public dialogRef: MatDialogRef<CreateAdminComponent>,
  ) { }

  ngOnInit(): void {
  }

}
