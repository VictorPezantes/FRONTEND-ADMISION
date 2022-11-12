import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Oferta } from '../../admision.interface';
import { BehaviorSubject, merge, Subject, switchMap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { PostulacionesService } from '../postulaciones/postulaciones.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { Postulante } from '../../admision.interface';
import { GestionarExamenComponent } from './gestionar-examen/gestionar-examen.component';
import { MatDialog } from '@angular/material/dialog';
import { ReprogramComponent } from './modal/reprogram/reprogram.component';
import { CancelExamComponent } from './modal/cancel-exam/cancel-exam.component';
import { UploadResultsExamenComponent } from './modal/upload-results-examen/upload-results-examen.component';


@Component({
    selector: 'app-examen-medico',
    templateUrl: './examen-medico.component.html',
    styleUrls: ['./examen-medico.component.scss']
})
export class ExamenMedicoComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Postulante[] = [];
    displayedColumns: string[] = ['imagen', 'informacion', 'estado', 'responsable', 'actions'];

    count;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public dialog: MatDialog,
        private _ngxSpinner: NgxSpinnerService,
        private _messageProviderService: MessageProviderService,
        private _postulacionService: PostulacionesService,
        private _admisionService: AdmisionService,
    ) {
        this._admisionService.title.next('Examen Médico');
    }

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
                    queryParamsByPaginator.estadoPostulanteId = 5;
                    return this._postulacionService.getPostulantes(queryParamsByPaginator);
                })
            ).subscribe((response) => {
                this._ngxSpinner.hide();
                this.count = response?.count;
                this.dataSource = response?.content;
                console.log(this.dataSource);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    gestionarExamen() {
        this.dialog.open(GestionarExamenComponent);
    }

    reprogram(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(ReprogramComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    cancelExam(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(CancelExamComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    uploadResults(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(UploadResultsExamenComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

}
