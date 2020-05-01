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
        loadChildren: () => import('./applications/applications.module').then(mod => mod.ApplicationsModule)
      },
      {
        path: 'big-data',
        loadChildren: () => import('./big-data/big-data.module').then(mod => mod.BigDataModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
