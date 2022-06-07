import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicComponent } from './components/basic/basic.component';
import { ErrorComponent } from './components/error/error.component';




@NgModule({
  declarations: [
    BasicComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
   
  ],
  exports: [
    BasicComponent,
    ErrorComponent

  ]
})
export class SharedModule { }
