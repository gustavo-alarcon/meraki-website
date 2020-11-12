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

  @ViewChild('app_projects_image', { static: true }) app_proj_image: ElementRef;
  @ViewChild('app_projects_image_mobile', { static: true }) app_proj_image_mobile: ElementRef;

  appProjects: Array<string> = [
    '../../assets/images/bg-disto.jpg',
    '../../assets/images/meraki-delivery-app.jpg',
  ]

  appProjectsMobile: Array<string> = [
    '../../assets/images/bg-disto-mobile.jpg',
    '../../assets/images/meraki-delivery-app-mobile.jpg',
  ]

  appProjectContent: Array<string> = [
    'Distribuidora torres es una quesería super diferente con sede en Lima, tienen productos Arequipeños seleccionados \
    , un servicio al cliente exclusivo y pronto una super plataforma de venta que transmitirá todo su calor y amor al queso !',

    'Cuando la pandemia llego, también llegaron necesidades que atender. Meraki Delivery App es una herramienta \
    digital que ayuda a todo tipo de empresas a gestionar sus pedidos de delivery y dar un mejor servicio a sus clientes',

  ]

  projectDescription: string = this.appProjectContent[0];
  index: number = 0

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private _seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // this.router.data
    //   .pipe(
    //     take(1)
    //   )
    //   .subscribe(data => {
    //     if (data) {
    //       this._seoService.updateTitle(data['title']);
    //       this._seoService.updateDescription(data['description']);
    //       this._seoService.updateOgTitle(data['title']);
    //       this._seoService.updateOgDescription(data['description']);
    //       this._seoService.updateOgUrl(data['ogUrl']);
    //       this._seoService.updateOgSiteName(data['ogSiteName']);
    //       this._seoService.updateOgImage(data['image']);
    //       this._seoService.updateTwitterTitle(data['title']);
    //       this._seoService.updateTwitterDescription(data['description']);
    //       this._seoService.updateTwitterImage(data['image']);
    //     }

    //   })
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    )
      .subscribe((event) => {
        this._seoService.updateTitle(event['title']);
        this._seoService.updateDescription(event['description']);
        this._seoService.updateOgTitle(event['title']);
        this._seoService.updateOgDescription(event['description']);
        this._seoService.updateOgUrl(event['ogUrl']);
        this._seoService.updateOgSiteName(event['ogSiteName']);
        this._seoService.updateOgImage(event['image']);
        this._seoService.updateTwitterTitle(event['title']);
        this._seoService.updateTwitterDescription(event['description']);
        this._seoService.updateTwitterImage(event['image']);
      });
  }
  
  changeAppProjectImage(index: number) {
    // console.log(index);
    this.index = index
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
