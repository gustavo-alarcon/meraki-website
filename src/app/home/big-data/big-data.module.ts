import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigDataRoutingModule } from './big-data-routing.module';
import { BigDataComponent } from './big-data.component';


@NgModule({
  declarations: [BigDataComponent],
  imports: [
    CommonModule,
    BigDataRoutingModule
  ]
})
export class BigDataModule { }
