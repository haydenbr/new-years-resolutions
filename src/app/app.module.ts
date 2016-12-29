import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MyApp } from './app.component';
import { reducer } from '../reducers';
import { TasksCollectionEffects } from '../effects/tasks-collection.effects';

import {
  ResolutionsPage, 
  MilestonesPage
} from '../pages';

import {
  TaskFactory, 
  TaskStore,
  SettingsService, 
  QuoteService,
  StorageService
} from '../providers';

import { TaskModal, TaskListComponent } from '../components';

@NgModule({
  declarations: [
    MyApp,
    ResolutionsPage,
    MilestonesPage,
    TaskModal,
    TaskListComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(reducer), // should we also pass in initial state?
    EffectsModule.run(TasksCollectionEffects)
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
    TaskFactory,
    TaskStore,
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
