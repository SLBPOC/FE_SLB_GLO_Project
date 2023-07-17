import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellListRoutingModule } from './well-list-routing.module';
import { WellListComponent } from './well-list.component';


@NgModule({
  declarations: [
    WellListComponent
  ],
  imports: [
    CommonModule,
    WellListRoutingModule
  ]
})
export class WellListModule { }
