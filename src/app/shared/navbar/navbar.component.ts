import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidebarVisible = false;

  constructor(private router: Router){
    this.sidebarVisible = true
  }
  
  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/inicioSesion')

  }

}
