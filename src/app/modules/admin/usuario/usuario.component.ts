import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Usuarios } from 'app/shared/interfaces/common.interface';
import { UsuarioService } from './usuario.service';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class usuarioComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Usuarios[] = [];
    displayedColumns: string[] = ['ID', 'NOMBRES', 'USUARIO', 'EMAIL', 'ROL', 'actions'];

    signAdminForm: FormGroup;

    constructor(
        public dialog: MatDialog,
        private _formBuilder: UntypedFormBuilder,
        private _usuarioService: UsuarioService,
        private _messageProviderService: MessageProviderService,
    ) {
        //this.createFormActions();
    }

    ngOnInit(): void {
        this.listarUsuarios();

    }

    ngAfterViewInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Items por página.';

    }

    listarUsuarios(): void {
        this._usuarioService.getAdmins().subscribe((reponse: any) => {
            this.dataSource = reponse;
        });
    }

    openDialog() {
        this.dialog.open(CreateAdminComponent);
    }

}
