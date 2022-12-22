import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import { HasRoleGuard } from '../../../has-role.guard';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    id: string
    titulo: string
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        const params = this._activatedRoute.snapshot.params;
        if (params.id && params.titulo) {
            this.id = params.id 
            this.titulo = params.titulo 
            //console.log("Recibiendo parámetros del landing ofertas: " + params.id + " - " + params.titulo)
        }


        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['demo@demo.com', [Validators.required, Validators.email]],
            password: ['123456', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.

                    const params = this._activatedRoute.snapshot.params;
                    if (params.id && params.titulo) {
                        console.log("Existen parámetros id y títutlo")
                        this._router.navigate(['/solicitud/registrar-solicitud', { id: this.id, titulo: this.titulo }]);
                    } else {
                        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('empresa') || '/signed-in-redirect';
                        // Navigate to the redirect url
                        console.log("Redirigiendo a empresa")
                        this._router.navigateByUrl(redirectURL);
                        
                    }

                },
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Usuario o contraseña incorrectos'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
