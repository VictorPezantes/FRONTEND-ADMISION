import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';

import { BehaviorSubject, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { MatDialog } from '@angular/material/dialog';
import { Postulante } from '../../admision.interface';
import { PostulacionesService } from '../../containers/postulaciones/postulaciones.service';
import { EntrevistasService } from '../../containers/entrevistas/entrevistas.service';

import { Modal1CreateInterviewComponent } from './modal1-create-interview.component';

@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Postulante[] = [];
  displayedColumns: string[] = ['imagen', 'informacion', 'estado', 'responsable', 'actions'];

  count = 0;

  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private _ngxSpinner: NgxSpinnerService,
    private _messageProviderService: MessageProviderService,
    private _postulacionService: PostulacionesService,
    private _admisionService: AdmisionService,
    private _entrevistaService: EntrevistasService) { this._admisionService.title.next('Entrevistas') }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.paginator._intl.itemsPerPageLabel = 'Items por página.';

    this.initPagination();
  }

  initPagination(): void {
    merge(this.paginator.page, this.changesSubject, this._postulacionService.eventFilters)
      .pipe(
        switchMap(() => {
          this._ngxSpinner.show();
          const rawValue = this._postulacionService.eventFilters.value;
          const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
          const queryParamsByPaginator = { ...filters } as any;
          queryParamsByPaginator.limit = this.paginator.pageSize;
          queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
          return this._postulacionService.get(queryParamsByPaginator);
        })
      ).subscribe((response) => {
        this._ngxSpinner.hide();
        this.count = response.count;
        this.dataSource = response.content;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openModal1() {
    const dialogData = {
      width: '50vw',
      id: 'modal2'
    };

    const dialogRef = this.dialog.open(Modal1CreateInterviewComponent, dialogData);

    console.log(dialogRef);
  }

  close(): void {
    this.dialog.closeAll();
  }

}
