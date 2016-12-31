import { Action } from '@ngrx/store';

import { Settings } from '../models';
import { actionType } from '../util';

export const actions = {
	TOGGLE_DARK_MODE: actionType('[Settings] Toggle Dark Mode'),
	TOGGLE_REORDER_MODE: actionType('[Settings] Toggle Reorder Mode')
};

export class ToggleDarkMode implements Action {
	type = actions.TOGGLE_DARK_MODE;

	constructor() {}
}

export class ToggleReorderMode implements Action {
	type = actions.TOGGLE_REORDER_MODE;

	constructor() {}
}