import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Usuarios } from 'app/shared/interfaces/common.interface';
import { response } from 'express';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class usuarioComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Usuarios[] = [];

    displayedColumns: string[] = ['ID', 'NOMBRES', 'USUARIO', 'EMAIL', 'ROL','actions'];

    signAdminForm: FormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _adminService: UsuarioService
    ) {
        //this.createFormActions();
    }

    ngOnInit(): void {
        this.listarUsuarios();

    }

    ngAfterViewInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Items por página.';

        //this.initPagination();
    }

    listarUsuarios(): void {
        this._adminService.getAdmins().subscribe((reponse: any) => {
            this.dataSource = reponse;
            console.log(reponse)
            console.log(reponse?.[0]?.roles.id)
        });
    }

}
