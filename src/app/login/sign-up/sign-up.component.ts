import { Component } from '@angular/core';
import { Auth,createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Completa todos los campos correctamente',
      });
      return;
    }

    const { email, password } = this.registerForm.value;

    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
        });
        this.registerForm.reset();
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al registrarse',
          detail: error.message,
        });
      });
  }

}
