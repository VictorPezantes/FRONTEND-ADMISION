import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Oferta } from '../../admision.interface';
import { BehaviorSubject, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { PostulacionesService } from '../postulaciones/postulaciones.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { Postulante } from '../../admision.interface';
import { EntrevistasService } from './entrevistas.service';
import { CreateInterviewComponent } from '../../components/create-interview/create-interview.component';
import { ScheduleInterviewComponent } from '../../components/schedule-interview/schedule-interview.component'
import { EditInterviewComponent } from '../../components/edit-interview/edit-interview.component';
import { CancelInterviewComponent } from '../../components/cancel-interview/cancel-interview.component'

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.scss']
})
export class EntrevistasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Postulante[] = [];
  displayedColumns: string[] = ['imagen', 'informacion', 'estado', 'responsable', 'actions'];

  count = 0;

  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private _ngxSpinner: NgxSpinnerService,
    private _messageProviderService: MessageProviderService,
    private _postulacionService: PostulacionesService,
    private _admisionService: AdmisionService,
    private _entrevistaService: EntrevistasService
  ) {
    this._admisionService.title.next('Entrevistas');
  }

  ngOnInit(): void {
    this._entrevistaService.eventCreate
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => this.createInterview());

    this._entrevistaService.interviewSchedule
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => this.scheduleInterview());

    this._entrevistaService.editInterview
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => this.editInterview());

    this._entrevistaService.cancelInterview
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => this.cancelInterview());
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

  createInterview(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '50vw',
      disableClose: true
    };

    this._messageProviderService.showModal(CreateInterviewComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }

  scheduleInterview(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '55vw',
      disableClose: true
    };

    this._messageProviderService.showModal(ScheduleInterviewComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }

  editInterview(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '55vw',
      disableClose: true
    };

    this._messageProviderService.showModal(EditInterviewComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }

  cancelInterview(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '55vw',
      disableClose: true
    };

    this._messageProviderService.showModal(CancelInterviewComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
