import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private userService: UserService = inject(UserService);
  private router = inject(Router);
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  usuarios: Object[] = [
    { correo: 'fede@gmail.com', password: '123456' },
    { correo: 'luna@gmail.com', password: '123456' },
    { correo: 'clari@gmail.com', password: '123456' },
  ];

  constructor() {
    this.fg = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }
  acceder() {
    if (this.fg.valid) {
      this.userService
        .login(
          this.fg.controls['correo'].value,
          this.fg.controls['clave'].value
        )
        .then(() => {
          this.router.navigateByUrl('/home');
        })
        .catch(() => {
          //Muestro un alert de que no esta registrado
          console.error(
            'No se encuentra registrado',
            'Verifique correo y contraseña ingresadas'
          );
        })
        .finally(() => {
          this.fg.reset();
        });
    }
  }

  cargaUsuario(user: any) {
    this.fg.setValue({
      correo: user.correo,
      clave: user.password,
    });
  }
}
