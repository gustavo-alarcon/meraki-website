import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsitesRoutingModule } from './websites-routing.module';
import { WebsitesComponent } from './websites.component';


@NgModule({
  declarations: [WebsitesComponent],
  imports: [
    CommonModule,
    WebsitesRoutingModule
  ]
})
export class WebsitesModule { }
