import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { COMPONENTS } from './components';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule
];

@NgModule({
  imports: modules,
  exports: [
    ...modules,
    ...COMPONENTS
  ],
  declarations: COMPONENTS
})
export class SharedModule { }
