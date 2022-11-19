import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { SendEmailComponent } from './modal/send-email/send-email.component';
import { AssignResponsibleComponent } from './modal/assign-responsible/assign-responsible.component';
import { ChangeStatusPostulantComponent } from './modal/change-status-postulant/change-status-postulant.component';
import { CancelProcessPostulantComponent } from './modal/cancel-process-postulant/cancel-process-postulant.component';
import { ViewInformationComponent } from './view-information/view-information.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrintComponent } from './modal/print/print.component';

@Component({
    selector: 'app-postulaciones',
    templateUrl: './postulaciones.component.html',
    styleUrls: ['./postulaciones.component.scss']
})

export class PostulacionesComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Postulante[] = [];
    displayedColumns: string[] = ['imagen', 'informacion', 'estado', 'responsable', 'actions'];

    fotoPostulante: string = "";
    count;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _ngxSpinner: NgxSpinnerService,
        private _snackService: MatSnackBar,
        private _messageProviderService: MessageProviderService,
        private _postulacionService: PostulacionesService,
        private _admisionService: AdmisionService,
    ) {
        this._admisionService.title.next('Postulaciones');
    }

    ngOnInit(): void {
        this._postulacionService.eventCreate.pipe(takeUntil(this.unsubscribe))
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
                    queryParamsByPaginator.tamPagina = this.paginator.pageSize;
                    queryParamsByPaginator.numPagina = queryParamsByPaginator.tamPagina * this.paginator.pageIndex;
                    return this._postulacionService.getPostulantes(queryParamsByPaginator);
                })
            ).subscribe((response) => {
                this._ngxSpinner.hide();
                this.count = response?.numberOfElements;
                this.dataSource = response?.content;
                console.log(response?.content);

                this.dataSource.forEach(element => {
                    this.getPhotos(element.id);
                });

            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    createOrEditPostulant(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(CreatePostulantComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    sendEmail(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(SendEmailComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    assignResponsible(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(AssignResponsibleComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    changeSubStatus(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(ChangeStatusPostulantComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    cancelProcess(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(CancelProcessPostulantComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    imprimiCV(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(PrintComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    async getPhotos(payload): Promise<void> {
        try {
            const mensaje = await this._postulacionService.getPhoto(payload).toPromise();
            this.fotoPostulante = mensaje.data;
        } catch (err) {
            console.log('Error para obtuvo foto');
        }
    }

    viewInformation(element) {
        this._admisionService.postulante = element;
    }

    genFicha(element) {
        this._admisionService.postulante = element;
       // console.log(element);
    }

}
