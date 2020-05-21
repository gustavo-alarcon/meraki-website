import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsitesComponent } from './websites.component';

const routes: Routes = [
  {
    path: '',
    component: WebsitesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsitesRoutingModule { }
