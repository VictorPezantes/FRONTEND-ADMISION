import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Usuarios } from 'app/shared/interfaces/common.interface';
import { response } from 'express';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { MessageProviderService } from 'app/shared/services/message-provider.service';

import { UsuarioService } from 'app/modules/admin/usuario/usuario.service';
import { CreateAdminComponent } from 'app/modules/admin/usuario/components/create-admin/create-admin.component';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.scss']
})
export class ViewInformationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Usuarios[] = [];

  displayedColumns: string[] = ['ID', 'NOMBRES', 'USUARIO', 'EMAIL', 'ROL','actions'];

  signAdminForm: FormGroup;

  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  _unsubscribe: Subject<void> = new Subject<void>();

  constructor(
      private _formBuilder: UntypedFormBuilder,
      private _usuarioService: UsuarioService,
      private _messageProviderService: MessageProviderService,
  ) {
      //this.createFormActions();
  }

  ngOnInit(): void {
      this.listarUsuarios();

      this._usuarioService.eventCreateU
          .pipe(takeUntil(this._unsubscribe))
          .subscribe(_ => this.createAdmin());

  }

  ngAfterViewInit(): void {

      this.paginator._intl.itemsPerPageLabel = 'Items por página.';

      //this.initPagination();
  }

  listarUsuarios(): void {
      this._usuarioService.getAdmins().subscribe((reponse: any) => {
          this.dataSource = reponse;
          //console.log(reponse)
          //console.log(reponse?.[0]?.roles.id)
      });
  }

  createAdmin(element?): void {
      const dialogData = {
          data: {
              meta: element
          },
          width: '50vw',
          disableClose: true
      };

      this._messageProviderService.showModal(CreateAdminComponent, dialogData)
          .afterClosed().subscribe(_ => {
              this.changesSubject.next(true);
          });
  }

}
