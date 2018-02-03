import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from '../core/core.module';
import * as fromEffects from '../effects';
import { initialState, reducers } from '../reducers';
import { ResolutionModule } from '../resolution/resolution.module';
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
		StoreModule.forRoot(reducers, {
			initialState,
		}),
		EffectsModule.forRoot([fromEffects.MilestoneEffects, fromEffects.ResolutionEffects, fromEffects.SettingsEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 50,
		}),
		CoreModule,
		ResolutionModule,
		SettingsModule,
		SharedModule,
	],
	bootstrap: [IonicApp],
	entryComponents: COMPONENTS,
	providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Device, SplashScreen, StatusBar],
})
export class AppModule {}
