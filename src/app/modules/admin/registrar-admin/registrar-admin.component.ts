import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Usuarios } from 'app/shared/interfaces/common.interface';
import { response } from 'express';
import { RegistrarAdminService } from './registrar-admin.service';

@Component({
    selector: 'app-registrar-admin',
    templateUrl: './registrar-admin.component.html',
    styleUrls: ['./registrar-admin.component.scss']
})
export class registraradminComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Usuarios[] = [];

    displayedColumns: string[] = ['ID', 'NOMBRES', 'USUARIO', 'EMAIL', 'actions'];

    signAdminForm: FormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _adminService: RegistrarAdminService
    ) {
        //this.createFormActions();
    }

    ngOnInit(): void {
        this.listarAdmin();

    }

    ngAfterViewInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Items por página.';

        //this.initPagination();
    }

    listarAdmin(): void {
        this._adminService.getAdmins().subscribe((reponse: any) => {

            this.dataSource = reponse;
            //console.log(this.dataSource);
        });
    }

    /*createFormActions(): void {
        this.signAdminForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            nombreUsuario: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            foto: ['foto.jpg'],
            roles: [
                ['admin'],
            ]
        }
        );
    }*/

}
