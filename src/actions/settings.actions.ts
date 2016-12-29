import { Action } from '@ngrx/store';

import { Settings } from '../models';
import { actionType } from '../util';

export const actions = {
	TOGGLE_DARK_MODE: actionType('[Settings] Toggle Dark Mode')
};

export class ToggleDarkMode implements Action {
	type = actions.TOGGLE_DARK_MODE;

	constructor(public payload: Settings) {}
}