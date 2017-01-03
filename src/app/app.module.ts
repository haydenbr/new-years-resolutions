import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MyApp } from './app.component';
import { reducer } from '../reducers';
import { ResolutionEffects, MilestoneEffects, SettingsEffects } from '../effects';

import { ResolutionsPage, MilestonesPage } from '../pages';

import { QuoteService, StorageService } from '../providers';

import { TaskModal, TaskListComponent, QuoteBgComponent, SideMenuComponent, NavbarComponent, FooterComponent, Foo } from '../components';

@NgModule({
  declarations: [
    MyApp,
    ResolutionsPage,
    MilestonesPage,
    TaskModal,
    TaskListComponent,
    QuoteBgComponent,
    SideMenuComponent,
    NavbarComponent,
    FooterComponent,
    Foo
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(reducer), // should we also pass in initial state?
    EffectsModule.run(ResolutionEffects),
    EffectsModule.run(MilestoneEffects),
    EffectsModule.run(SettingsEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    ResolutionsPage,
    MilestonesPage,
    TaskModal,
    SideMenuComponent
  ],
  providers: [
    Storage,
    QuoteService,
    StorageService,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
