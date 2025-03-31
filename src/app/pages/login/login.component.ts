import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { bootstrapGoogle } from "@ng-icons/bootstrap-icons";
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent],
  providers: [provideIcons({ bootstrapGoogle })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";
  showRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [this.confirmPasswordValidator()]]
    });
  }

  login(){
    if(this.email?.invalid || this.password?.invalid) return;
    
    if(this.showRegister){
      if(this.confirmPassword?.invalid) return;
      this.authService.registerWithEmail(this.email?.value, this.password?.value)
        .then(() => {
          this.errorMessage = "";
          this.usersService.loadUserInFirebase();
          this.redirectAfterAuth();
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = this.getErrorMessage(err.code);
        });
      return;
    }
    
    this.authService.loginWithEmail(this.email?.value, this.password?.value)
      .then(() => {
        this.errorMessage = "";
        this.usersService.loadUserInFirebase();
        this.redirectAfterAuth();
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = this.getErrorMessage(err.code);
      });
  }

  registerWithGoogle(){
    this.authService.loginWithGoogle()
      .then(() => {
        this.errorMessage = "";
        this.usersService.loadUserInFirebase();
        this.redirectAfterAuth();
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = this.getErrorMessage(err.code);
      });
  }

  private redirectAfterAuth() {
    // Redirige a la URL guardada o a products por defecto
    const redirectUrl = this.authService.redirectUrl || '/products';
    this.router.navigateByUrl(redirectUrl);
    this.authService.redirectUrl = null; // Limpiar la URL guardada
  }

  private getErrorMessage(errorCode: string): string {
    switch(errorCode) {
      case 'auth/invalid-email':
        return 'Correo electrónico inválido';
      case 'auth/user-disabled':
        return 'Usuario deshabilitado';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Correo o contraseña incorrectos';
      case 'auth/email-already-in-use':
        return 'El correo ya está en uso';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      default:
        return 'Error al iniciar sesión';
    }
  }

  toggleRegister(){
    this.showRegister = !this.showRegister;
    this.loginForm.get('confirmPassword')?.updateValueAndValidity();
  }

  get email() { return this.loginForm.get("email") };
  get password() { return this.loginForm.get("password") };
  get confirmPassword() { return this.loginForm.get("confirmPassword") };

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!this.showRegister) return null;
      const error = this.password?.value !== control.value;
      return error ? {confirmPassword: {value: control.value}} : null;
    };
  }  
}