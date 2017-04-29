import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as settingsActions from '../actions/settings.actions';
import { SettingsService } from '../services';

@Injectable()
export class SettingsEffects {
	constructor(
		private actions: Actions,
		private settingsService: SettingsService
	) {}

	@Effect()
	loadTasks: Observable<Action> = this.actions
		.ofType(settingsActions.actions.LOAD_SETTINGS)
		.startWith(new settingsActions.LoadSettings())
		.switchMap(() => {
			return this.settingsService.getSettings()
				.map((settings) => new settingsActions.LoadSettingsSuccess(settings))
				.catch((error) => of(new settingsActions.LoadSettingsFail(error)));
		});

	@Effect()
	toggleDarkMode: Observable<Action> = this.actions
		.ofType(settingsActions.actions.TOGGLE_DARK_MODE)
		.map(toPayload)
		.switchMap((toggle) => {
			return this.settingsService.setDarkMode(toggle)
				.map((settings) => new settingsActions.ToggleDarkModeSuccess(toggle))
				.catch((error) => of(new settingsActions.ToggleDarkModeFail(error)));
		});
}