import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private _authService: AuthService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      numeroDocumento: [null, Validators.compose([Validators.required])],
      contrasena: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.loading = true;

    this._authService.login({ ...this.loginForm.value, tipoUsuario: 'E' }).
      subscribe({
        next: async (response: any) => {
          this.loading = false;
          this._authService.token = response.token;
          this._authService.user = response.user;
          this._router.navigate(['home']);
        },
        error: async (err: any) => {
          this.loading = false;
          // this.count += 1;
          // this.toasts = { count: this.count, message: err.error.message, classname: 'bg-danger mb-3 text-white' };
        }
      });
  }
}
