import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OfertasService } from '../../../../admin/admision/containers/ofertas/ofertas.service';
import { Observable, of, switchMap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-ofertas-laborales',
    templateUrl: './ofertas-laborales.component.html',
    styleUrls: ['./ofertas-laborales.component.scss'],
})
export class OfertasLaboralesComponent implements OnInit {

    search = new FormControl(null, [Validators.required]);

    availableOffers = [];

    idofertas: string;

    isAuthenticated: boolean;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _offerService: OfertasService,
    ) {
    }

    ngOnInit(): void {

        if (this._authService.accessToken) {
            this.isAuthenticated = true;
            //console.log("Loggued")
        } else {
            this.isAuthenticated = false;
            //console.log("No loggued")
        }

        // this._authService.check()

        this._offerService.getAvailableOffers({ paginated: true })
            .subscribe(results => {
                //console.log(results.content);
                this.availableOffers = results.content;
            });

    }

    f(): Observable<boolean> {
        return this._authService.check().pipe(
            switchMap((authenticated) => {
                //console.log("kk")
                if (authenticated) {
                    //console.log("Loggueado")
                } else {
                    //console.log("No loggueado")
                }
                return of(true);
            })
        )
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    cancel(): void {
        this._router.navigateByUrl('iniciar-sesion');
    }

    // _check(): boolean {
    //     const rpta = this._authService.check()
    //     console.log(rpta)
    //     return true;
    // }

}
