import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertModule, BsDatepickerModule, BsDropdownModule, ModalModule, PopoverModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports: [
    AlertModule,
    BsDatepickerModule,
    BsDropdownModule,
    ModalModule,
    PopoverModule
  ]
})
export class NgxBootstrapModule { }
