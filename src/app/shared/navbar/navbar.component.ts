import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidebarVisible = false;
  userEmail = '';

  constructor(private router: Router){
    this.sidebarVisible = true;
    this.getInformationFromUser();
  }
  
  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/inicioSesion')

  }


   getInformationFromUser(){
  const userInformation = localStorage.getItem('user')!;
  const data = JSON.parse(userInformation);
  this.userEmail = data.email
  console.log("useremial", this.userEmail);
  
 }

}
