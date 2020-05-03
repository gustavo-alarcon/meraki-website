import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators'

import { ContactComponent } from "../contact/contact.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  app_proj_image: any;
  app_proj_image_mobile: any;

  appProjects: Array<string> = [
    '../../assets/images/meraki-delivery-app.jpg',
    '../../assets/images/almacenes-la-joya.jpg',
    '../../assets/images/standard-jobs-la-joya.jpg',
  ]

  appProjectsMobile: Array<string> = [
    '../../assets/images/meraki-delivery-app-mobile.jpg',
    '../../assets/images/almacenes-la-joya-mobile.jpg',
    '../../assets/images/standard-jobs-la-joya-mobile.jpg',
  ]

  appProjectContent: Array<string> = [
    'Cuando la pandemia llego, también llegaron necesidades que atender. Meraki Delivery App es una herramienta \
    digital que ayuda a todo tipo de empresas a gestionar sus pedidos de delivery y dar un mejor servicio a sus clientes',

    'Como proveedores de software, siempre hemos ayudado a Ferreyros La Joya a implementar iniciativas de software y sabemos que los almacenes \
    son de vital importancia para la operación, así que estamos creando una herramienta digital a medida que optimice la logística interna',

    'Los tiempos standard o standard jobs, son de vital importancia para medir y ejecutar la operación con precisión, así que para mantener el trabajo \
    de forma cronométrica, estamos desarrollando una aplicación que le permita a los supervisores tener una vista de planta de todos los tiempos en taller'
  ]

  projectDescription: string = this.appProjectContent[0];

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.app_proj_image = document.getElementById('app_projects_image');
    this.app_proj_image_mobile = document.getElementById('app_projects_image_mobile');
  }

  changeAppProjectImage(index: number) {
    this.app_proj_image.src = this.appProjects[index];
    this.app_proj_image_mobile.src = this.appProjectsMobile[index];
    this.projectDescription = this.appProjectContent[index];
  }

  openContact(subject: string): void {
    this.dialog.open(ContactComponent, {
      data: subject
    }).afterClosed()
      .pipe(
        take(1)
      ).subscribe(res => {
        if(res){
          this.snackbar.open('Mensaje enviado. Nos pondremos en contacto lo antes posible!', 'Aceptar')
        }
      })
  }

}
