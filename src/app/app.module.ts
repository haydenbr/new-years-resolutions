import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MyApp } from './app.component';
import { reducer } from '../reducers';
import { ResolutionEffects, MilestoneEffects, SettingsEffects } from '../effects';

import { ResolutionsPage, MilestonesPage } from '../pages';

import { QuoteService, StorageService } from '../services';

import { TaskModal, TaskListComponent, QuoteBgComponent, SideMenuComponent, NavbarComponent, FooterComponent } from '../components';

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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.runAfterBootstrap(ResolutionEffects),
    EffectsModule.runAfterBootstrap(MilestoneEffects),
    EffectsModule.runAfterBootstrap(SettingsEffects),
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
    QuoteService,
    StorageService,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
