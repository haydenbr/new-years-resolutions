import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { TasksPage, MilestonesPage } from '../pages';
import { TaskFactory } from '../services';

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    MilestonesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    TasksPage,
    MilestonesPage
  ],
  providers: [
    TaskFactory,

    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
