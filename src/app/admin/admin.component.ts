import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../core/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  opened: boolean = true;

  constructor(
    public sidenav: SidenavService
  ) {
    this.opened = this.sidenav.adminSidenav;
  }

  ngOnInit(): void {
  }

}
