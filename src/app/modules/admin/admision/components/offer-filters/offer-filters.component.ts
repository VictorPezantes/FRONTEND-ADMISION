import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { OfertasService } from '../../containers/ofertas/ofertas.service';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import moment from 'moment';
import { Encargado, Estado } from '../../../../../shared/interfaces/common.interface';
import { CommonService } from '../../../../../shared/services/common.service';
import { UserService } from '../../../../../core/user/user.service';
import { PostulacionesService } from '../../containers/postulaciones/postulaciones.service';

@Component({
    selector: 'app-offer-filters',
    templateUrl: './offer-filters.component.html',
    styleUrls: ['./offer-filters.component.scss']
})
export class OfferFiltersComponent implements OnInit, AfterViewInit {

    formFilters: FormGroup;

    status: Estado[];
    //employees$: Observable<User[]>;
    creador: Encargado[];

    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _userService: UserService,
        private _offerService: OfertasService,
        private _commonService: CommonService,
        private _postulacionesService: PostulacionesService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        this._commonService.getStatus().subscribe(estado => (
            this.status = estado,
            console.log(this.status)
            ));
        //this.employees$ = this._userService.getAll({ paginated: false });
        this._postulacionesService.getEncargado().subscribe(response => (this.creador = response));
    }

    ngAfterViewInit(): void {
        this.formFilters.valueChanges
            .pipe(takeUntil(this.unsubscribe), debounceTime(500))
            .subscribe(value => {
                const parsedData = this.castToParams(value);
                console.log(parsedData);
                this._offerService.eventFilters.next(parsedData);
            });
    }

    castToParams(filters) {
        filters.fechaPublicacion = filters?.fechaPublicacion ? moment(filters?.fechaPublicacion).format('DD/MM/YYYY') : null;
        return filters;
    }

    createFormFilters(): void {
        this.formFilters = this._fb.group({
            titulo: [''],
            estado: [''],
            creador: [''],
            fechaPublicacion: [''],
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
