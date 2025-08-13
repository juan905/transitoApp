import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: FirestoreService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    }
  const { email, password } = this.loginForm.value;
  this.authService.login(email, password)
  .then(userCredential => {
    localStorage.setItem('user', JSON.stringify(userCredential.user));
    this.router.navigate(['/createQuestions/examen']);
  })
  .catch(err => this.messageService.add({
    severity: 'error',
    summary: 'Por favor verifique la información'
  }));
}

}
