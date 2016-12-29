import { Action } from '@ngrx/store';

import { Task } from '../models';
import { actionType } from '../util';

export const actions = {
	EDIT: 										actionType('[Task] Edit'),
	EDIT_SUCCESS:							actionType('[Task] Edit Success'),
	SEARCH: 									actionType('[Task] Seach'),
	SEARCH_SUCCESS: 					actionType('[Task] Seach Success'),
	ADD_MILESTONE: 						actionType('[Task] Add Milestone'),
	ADD_MILESTONE_SUCCESS: 		actionType('[Task] Add Milestone Success'),
	REMOVE_MILESTONE: 				actionType('[Task] Remove Milestone'),
	REMOVE_MILESTONE_SUCCESS: actionType('[Task] Remove Milestone Success'),
	TOGGLE_COMPLETE_STATUS:		actionType('[Task] Toggle Complete Status')
}

export class Edit implements Action {
	type = actions.EDIT;

	constructor(public payload: Task) {}
}

export class EditSuccess implements Action {
	type = actions.EDIT_SUCCESS;

	constructor(public payload: Task) {}
}

export class Search implements Action {
	type = actions.SEARCH;

	constructor(public payload: string) {}
}

export class SearchSuccess implements Action {
	type = actions.SEARCH_SUCCESS;

	constructor(public payload: Task[]) {}
}

export class AddMilestone implements Action {
	type = actions.ADD_MILESTONE;

	constructor(public payload: Task) {}
}

export class AddMilestoneSuccess implements Action {
	type = actions.ADD_MILESTONE_SUCCESS;

	constructor(public payload: Task) {}
}

export class RemoveMilestone implements Action {
	type = actions.REMOVE_MILESTONE;

	constructor(public payload: Task) {}
}

export class RemoveMilestoneSuccess implements Action {
	type = actions.REMOVE_MILESTONE_SUCCESS;

	constructor(public payload: Task) {}
}

export class ToggleCompleteStatus implements Action {
	type = actions.TOGGLE_COMPLETE_STATUS;

	constructor(public payload: Task) {}
}