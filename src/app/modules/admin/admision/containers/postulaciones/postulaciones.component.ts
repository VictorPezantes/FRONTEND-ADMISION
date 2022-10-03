import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Postulante } from '../../admision.interface';
import { BehaviorSubject, merge, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { PostulacionesService } from './postulaciones.service';
import { CreatePostulantComponent } from '../../components/create-postulant/create-postulant.component';
import moment from 'moment';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.scss']
})

export class PostulacionesComponent implements OnInit, AfterViewInit, OnDestroy {

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
  ) {
    this._admisionService.title.next('Postulaciones');
  }

  ngOnInit(): void {
    this._postulacionService.eventCreate
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => this.createOrEditPostulant());
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

        /*moment.locale('es');
        const date = moment().add(this.dataSource?.[0]?.fechaIngresoTrabajoReciente);
        let dateInFormat = date.format('MMM YYYY');
        console.log(dateInFormat);*/

        console.log(this.dataSource);

      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createOrEditPostulant(element?): void {
    const dialogData = {
      data: {
        meta: element
      },
      width: '50vw',
      disableClose: true
    };

    this._messageProviderService.showModal(CreatePostulantComponent, dialogData)
      .afterClosed().subscribe(_ => {
        this.changesSubject.next(true);
      });
  }
}
