import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MyApp } from './app.component';
import { reducer } from '../reducers';
import { ResolutionEffects, MilestoneEffects } from '../effects';

import {
  ResolutionsPage, 
  MilestonesPage
} from '../pages';

import {
  SettingsService, 
  QuoteService,
  StorageService
} from '../providers';

import { TaskModal, TaskListComponent, QuoteBgComponent } from '../components';

@NgModule({
  declarations: [
    MyApp,
    ResolutionsPage,
    MilestonesPage,
    TaskModal,
    TaskListComponent,
    QuoteBgComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(reducer), // should we also pass in initial state?
    EffectsModule.run(ResolutionEffects),
    EffectsModule.run(MilestoneEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    ResolutionsPage,
    MilestonesPage,
    TaskModal
  ],
  providers: [
    Storage,
    SettingsService,
    QuoteService,
    StorageService,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
