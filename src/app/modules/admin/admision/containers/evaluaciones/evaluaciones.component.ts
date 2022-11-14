import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { PostulacionesService } from '../postulaciones/postulaciones.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { Postulante } from '../../admision.interface';
import { EvaluacionesService } from './evaluaciones.service';
import { ManageEvaluationComponent } from '../../components/manage-evaluation/manage-evaluation.component';
import { LoadResultsEvaluationComponent } from '../../components/load-results-evaluation/load-results-evaluation.component'

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss']
})
export class EvaluacionesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Postulante[] = [];
  displayedColumns: string[] = ['imagen', 'informacion', 'estado', 'responsable', 'actions'];

  count;

  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private _ngxSpinner: NgxSpinnerService,
    private _messageProviderService: MessageProviderService,
    private _postulacionService: PostulacionesService,
    private _admisionService: AdmisionService,
    private _evaluacionesService: EvaluacionesService
  ) {
    this._admisionService.title.next('Evaluaciones');
  }

  ngOnInit(): void {
    this._evaluacionesService.eventCreate
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => this.manageEvaluation());
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
        this.count = response?.numberOfElements;
        this.dataSource = response?.content;
      });
  }

  manageEvaluation(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '50vw',
      disableClose: true
    };

    this._messageProviderService.showModal(ManageEvaluationComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }

  loadResults(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '50vw',
      disableClose: true
    };

    this._messageProviderService.showModal(LoadResultsEvaluationComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
