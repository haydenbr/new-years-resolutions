import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { SERVICES } from './services';

@NgModule({
  imports: [ SharedModule ],
  exports: [],
  declarations: [],
  providers: SERVICES,
})
export class SettingsModule { }
