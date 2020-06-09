import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  adminSidenav: boolean = true;

  constructor() { }

  toggleAdminSidenav(): void {
    console.log("hola")
    this.adminSidenav = !this.adminSidenav;
  }


}
