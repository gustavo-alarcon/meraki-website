import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { take } from 'rxjs/operators'

import { ContactComponent } from "../contact/contact.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.css']
})
export class BigDataComponent implements OnInit {

  app_proj_image: any;
  app_proj_image_mobile: any;

  appProjects: Array<string> = [
    '../../assets/images/bd-proj-1.jpg',
    '../../assets/images/bd-proj-2.jpg',
    '../../assets/images/bd-proj-3.jpg',
  ]

  appProjectsMobile: Array<string> = [
    '../../assets/images/bd-proj-mobile-1.jpg',
    '../../assets/images/bd-proj-mobile-2.jpg',
    '../../assets/images/bd-proj-mobile-3.jpg',
  ]

  appProjectContent: Array<string> = [
    'El taller de mecanizado y metalizado, tiene a cargo uno de los puntos más importantes dentro de proceso de recuperación, \
    y poder simular y predecir si van a cumplir con la demanda semanal, es clave para tomar las mejores desiciones.',

    'Los componentes enviados al taller, tienes miles de partes que pueden ser reparadas, ya sea por mantenimientos correctivos o \
    planificados, entonces, tener un cojunto de insumos característicos por modelo, sistema y subsistema, mejora los tiempos de logística.',

    'Los trabajos desarrollados en el taller de mecanizado y metalizado, están precisamente catalogados, lo que abrió una ventana al análisis de \
    insumos consumidos por trabajo, pudiendo generar recetas de insumos y mejorar aun más los tiempos en logística'
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
