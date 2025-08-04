import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private authService: FirestoreService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/inicioSesion/login']);
      return false;
    }
  }
}
