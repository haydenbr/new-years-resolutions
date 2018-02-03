import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as fromActions from '../actions/settings.actions';
import { SettingsService } from '../settings/services';

@Injectable()
export class SettingsEffects {
	constructor(private actions: Actions, private settingsService: SettingsService) {}

	@Effect()
	loadResolutions: Observable<Action> = this.actions
		.ofType(fromActions.actions.GET_SETTINGS)
		.startWith(new fromActions.GetSettings())
		.switchMap(() => {
			return this.settingsService
				.getSettings()
				.map(settings => new fromActions.GetSettingsSuccess(settings))
				.catch(error => of(new fromActions.GetSettingsFail(error)));
		});

	@Effect()
	toggleDarkMode: Observable<Action> = this.actions
		.ofType(fromActions.actions.TOGGLE_DARK_MODE)
		.map((action: fromActions.ToggleDarkMode) => action.payload)
		.switchMap(toggle => {
			return this.settingsService
				.setDarkMode(toggle)
				.map(settings => new fromActions.ToggleDarkModeSuccess(toggle))
				.catch(error => of(new fromActions.ToggleDarkModeFail(error)));
		});
}
