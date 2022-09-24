import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    //signUpForm: UntypedFormGroup;
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
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
        // Create the form
        this.signUpForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            nombreUsuario: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            foto: ['foto.jpg'],
            roles: [
                ['admin'],
            ],
            agreements: ['', Validators.requiredTrue]
        }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // FORMDATA
        const form = this.signUpForm.value;
        const foto = new Blob([form?.foto], { type: 'multipart/form-data' });

        const formData = new FormData();
        formData.append('apellidos', form?.apellidos);
        formData.append('email', form?.email);
        formData.append('foto', foto);
        formData.append('fotografia', 'ff');
        formData.append('nombre', form?.nombre);
        formData.append('nombreUsuario', form?.nombreUsuario);
        formData.append('password', form?.password);
        formData.append('roles', form?.roles);

        // Sign up
        //this._authService.signUp(this.signUpForm.value)
        this._authService.signUp(formData)
            .subscribe(
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.mensaje
                    };

                    if (response.mensaje == 'Usuario registrado correctamente') {
                        this._router.navigateByUrl('/iniciar-sesion'); // Navigate to the confirmation required page
                    } else {
                        this.showAlert = true; // Show the alert
                    }

                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Error al intentar crear el usuario, comuniquese con el administrador'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

}
