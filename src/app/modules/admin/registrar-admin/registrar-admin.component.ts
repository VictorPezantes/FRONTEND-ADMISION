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

    displayedColumns: string[] = ['ID', 'NOMBRES', 'USUARIO', 'EMAIL', 'ROL','actions'];

    signAdminForm: FormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _adminService: RegistrarAdminService
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
