import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'applications',
        loadChildren: () => import('./applications/applications.module').then(mod => mod.ApplicationsModule),
        data: {
          title: '🥇 Meraki Solutions | Desarrollo de aplicaciones para empresas peruanas',
          description: 'Meraki Solutions desarrolla aplicaciones web, aplicaciones PWA y aplicaciones multiplataforma (Android y iOS), para empresas peruanas.',
          ogUrl: 'https://meraki-s.com/home/applications',
          ogSiteName: '🥇 Meraki Solutions | Desarrollo de aplicaciones para empresas peruanas',
          image: 'https://storage.googleapis.com/staging.meraki-solutions-web.appspot.com/uploads/meraki-solutions-aplicaciones.jpg'
        }
      },
      {
        path: 'big-data',
        loadChildren: () => import('./big-data/big-data.module').then(mod => mod.BigDataModule),
        data: {
          title: '🥇 Meraki Solutions | Big data, Analítica de datos e infraestructura de datos',
          description: 'Meraki Solutions lo ayudará a analizar todos los datos necesarios para descrubrir la información clave que hará mejorar su empresa, producto o servicio.',
          ogUrl: 'https://meraki-s.com/home/big-data',
          ogSiteName: '🥇 Meraki Solutions | Big data, Analítica de datos e infraestructura de datos',
          image: 'https://storage.googleapis.com/staging.meraki-solutions-web.appspot.com/uploads/meraki-solutions-big-data.jpg'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
