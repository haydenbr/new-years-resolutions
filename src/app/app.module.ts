import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from '../core/core.module';
import { ResolutionEffects, MilestoneEffects, SettingsEffects } from '../effects';
import { reducer } from '../reducers';
import { ResolutionModule } from '../resolution/resolution.module'
import { SettingsModule } from '../settings/settings.module';
import { SharedModule } from '../shared/shared.module';

import { AppComponent, COMPONENTS } from './components';

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.runAfterBootstrap(ResolutionEffects),
    EffectsModule.runAfterBootstrap(MilestoneEffects),
    EffectsModule.runAfterBootstrap(SettingsEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    CoreModule,
    ResolutionModule,
    SettingsModule,
    SharedModule
  ],
  bootstrap: [ IonicApp ],
  entryComponents: COMPONENTS,
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
