import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { take, filter, map, mergeMap, tap } from 'rxjs/operators'
import { Title, Meta } from '@angular/platform-browser';

import { ContactComponent } from "../contact/contact.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SeoService } from 'src/app/core/seo.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  

  title = '🥇Aplicaciones móviles en Arequipa para empresas, desarrollo de aplicaciones, diseño de aplicaciones, aplicaciones pwa, aplicaciones web en arequipa, aplicaciones arequipa';
  description = 'Desarrollo, diseño y programación de apps móviles para negocios✅, capta más clientes mostrando productos o servicios en una App móvil con desarrollo a medida';

  // app_proj_image: any;
  // app_proj_image_mobile: any;

  @ViewChild('app_projects_image', {static: true}) app_proj_image:ElementRef;
  @ViewChild('app_projects_image_mobile', {static: true}) app_proj_image_mobile:ElementRef;

  appProjects: Array<string> = [
    '../../assets/images/meraki-delivery-app.jpg',
    '../../assets/images/almacenes-la-joya.jpg',
    '../../assets/images/standard-jobs-la-joya.jpg'
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
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   tap(() => console.log('navigation ends')),
    //   map(() => this.activatedRoute),
    //   map(route => {
    //     console.log(route);
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }),
    //   filter((route) => route.outlet === 'primary'),
    //   mergeMap((route) => route.data)
    //  )
    //  .subscribe((event) => {
    //    console.log(event['title']);
    // this._seoService.updateTitle(event['title']);
    // this._seoService.updateDescription(event['description']);
    // this._seoService.updateOgTitle(event['title']);
    // this._seoService.updateOgDescription(event['description']);
    // this._seoService.updateOgUrl(event['ogUrl']);
    // this._seoService.updateOgSiteName(event['ogSiteName']);
    // this._seoService.updateOgImage(event['image']);
    // this._seoService.updateTwitterTitle(event['title']);
    // this._seoService.updateTwitterDescription(event['description']);
    // this._seoService.updateTwitterImage(event['image']);
    //  }); 
  }

  ngAfterViewInit() {
    // this.app_proj_image = document.getElementById('app_projects_image');
    // this.app_proj_image_mobile = document.getElementById('app_projects_image_mobile');
  }

  changeAppProjectImage(index: number) {
    console.log(index);
    this.app_proj_image['src'] = this.appProjects[index];
    this.app_proj_image_mobile['src'] = this.appProjectsMobile[index];
    this.projectDescription = this.appProjectContent[index];
  }

  openContact(subject: string): void {
    this.dialog.open(ContactComponent, {
      data: subject
    }).afterClosed()
      .pipe(
        take(1)
      ).subscribe(res => {
        if (res) {
          this.snackbar.open('Mensaje enviado. Nos pondremos en contacto lo antes posible!', 'Aceptar')
        }
      })
  }

}
