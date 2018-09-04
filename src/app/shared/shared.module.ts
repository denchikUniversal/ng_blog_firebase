import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavbarComponent
  ],
  declarations: [NavbarComponent]
})
export class SharedModule { }
