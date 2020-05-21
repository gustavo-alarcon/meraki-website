import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsitesRoutingModule } from './websites-routing.module';
import { WebsitesComponent } from './websites.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [WebsitesComponent],
  imports: [
    CommonModule,
    WebsitesRoutingModule,
    MatRippleModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class WebsitesModule { }
