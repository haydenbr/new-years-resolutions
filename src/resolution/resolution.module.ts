import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { COMPONENTS } from './components';
import { MODALS } from './modals';
import { PAGES } from './pages';
import { SERVICES } from './services';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ ...COMPONENTS, ...MODALS, ...PAGES ],
  entryComponents: [ ...MODALS, ...PAGES ],
  providers: SERVICES
})
export class ResolutionModule { }
