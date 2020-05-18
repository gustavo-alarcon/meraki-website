import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { take } from 'rxjs/operators'

import { ContactComponent } from "../contact/contact.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeoService } from 'src/app/core/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.css']
})
export class BigDataComponent implements OnInit {

  bd_proj_image: any;
  bd_proj_image_mobile: any;

  bdProjects: Array<string> = [
    '../../assets/images/bd-proj-1.jpg',
    '../../assets/images/bd-proj-2.jpg',
    '../../assets/images/bd-proj-3.jpg',
  ]

  bdProjectsMobile: Array<string> = [
    '../../assets/images/bd-proj-mobile-1.jpg',
    '../../assets/images/bd-proj-mobile-2.jpg',
    '../../assets/images/bd-proj-mobile-3.jpg',
  ]

  bdProjectContent: Array<string> = [
    'El taller de mecanizado y metalizado, tiene a cargo uno de los puntos más importantes dentro de proceso de recuperación, \
    y poder simular y predecir si van a cumplir con la demanda semanal, es clave para tomar las mejores desiciones.',

    'Los componentes enviados al taller, tienes miles de partes que pueden ser reparadas, ya sea por mantenimientos correctivos o \
    planificados, entonces, tener un cojunto de insumos característicos por modelo, sistema y subsistema, mejora los tiempos de logística.',

    'Los trabajos desarrollados en el taller de mecanizado y metalizado, están precisamente catalogados, lo que abrió una ventana al análisis de \
    insumos consumidos por trabajo, pudiendo generar recetas de insumos y mejorar aun más los tiempos en logística'
  ]

  projectDescription: string = this.bdProjectContent[0];

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private _seoService: SeoService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.data
      .pipe(
        take(1)
      )
      .subscribe(data => {
        if (data) {
          this._seoService.updateTitle(data['title']);
          this._seoService.updateDescription(data['description']);
          this._seoService.updateOgTitle(data['title']);
          this._seoService.updateOgDescription(data['description']);
          this._seoService.updateOgUrl(data['ogUrl']);
          this._seoService.updateOgSiteName(data['ogSiteName']);
          this._seoService.updateOgImage(data['image']);
          this._seoService.updateTwitterTitle(data['title']);
          this._seoService.updateTwitterDescription(data['description']);
          this._seoService.updateTwitterImage(data['image']);
        }

      })
  }

  ngAfterViewInit() {
    this.bd_proj_image = document.getElementById('bd_projects_image');
    this.bd_proj_image_mobile = document.getElementById('bd_projects_image_mobile');
  }

  changeBdProjectImage(index: number) {
    console.log(index)
    this.bd_proj_image.src = this.bdProjects[index];
    this.bd_proj_image_mobile.src = this.bdProjectsMobile[index];
    this.projectDescription = this.bdProjectContent[index];
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
