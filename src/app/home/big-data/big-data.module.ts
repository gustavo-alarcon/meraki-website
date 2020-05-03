import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigDataRoutingModule } from './big-data-routing.module';
import { BigDataComponent } from './big-data.component';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ContactComponent } from '../contact/contact.component';


@NgModule({
  declarations: [
    BigDataComponent
  ],
  imports: [
    CommonModule,
    BigDataRoutingModule,
    MatRippleModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class BigDataModule { }
