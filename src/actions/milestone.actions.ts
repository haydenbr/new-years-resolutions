import { Action } from '@ngrx/store';

import { Task } from '../resolution/models';

import { actionType } from './actiontype';

export const actions = {
	ADD_MILESTONE:             	actionType('[Milestone] Add Milestone'),
  ADD_MILESTONE_SUCCESS:     	actionType('[Milestone] Add Milestone Success'),
  ADD_MILESTONE_FAIL:        	actionType('[Milestone] Add Milestone Fail'),
  REMOVE_MILESTONE:          	actionType('[Milestone] Remove Milestone'),
  REMOVE_MILESTONE_SUCCESS:  	actionType('[Milestone] Remove Milestone Success'),
  REMOVE_MILESTONE_FAIL:     	actionType('[Milestone] Remove Milestone Fail'),
	EDIT_MILESTONE:          		actionType('[Milestone] Edit Milestone'),
  EDIT_MILESTONE_SUCCESS:  		actionType('[Milestone] Edit Milestone Success'),
  EDIT_MILESTONE_FAIL:     		actionType('[Milestone] Edit Milestone Fail'),
	REORDER_MILESTONE:					actionType('[Milestone] Reorder Milestone'),
	REORDER_MILESTONE_SUCCESS:	actionType('[Milestone] Reorder Milestone Success'),
	REORDER_MILESTONE_FAIL:			actionType('[Milestone] Reorder Milestone Fail')
}

// Add a milestone
export class AddMilestone implements Action {
	type = actions.ADD_MILESTONE;

	constructor(public payload: { resolutionId: string, milestone: Task }) {}
}

export class AddMilestoneSuccess implements Action {
	type = actions.ADD_MILESTONE_SUCCESS;

	constructor(public payload: { resolutionId: string, milestone: Task }) {}
}

export class AddMilestoneFail implements Action {
	type = actions.ADD_MILESTONE_FAIL;

	constructor(public payload?: any) {}
}

export class RemoveMilestone implements Action {
	type = actions.REMOVE_MILESTONE;

	constructor(public payload: { resolutionId: string, milestone: Task }) {}
}

export class RemoveMilestoneSuccess implements Action {
	type = actions.REMOVE_MILESTONE_SUCCESS;

	constructor(public payload: { resolutionId: string, milestone: Task }) {}
}

export class RemoveMilestoneFail implements Action {
	type = actions.REMOVE_MILESTONE_FAIL;

	constructor(public payload?: any) {}
}

// edit a milestone
export class EditMilestone implements Action {
	type = actions.EDIT_MILESTONE;

	constructor(public payload: { resolutionId: string, milestone: Task }) {}
}

export class EditMilestoneSuccess implements Action {
	type = actions.EDIT_MILESTONE_SUCCESS;

	constructor(public payload: { resolutionId: string, milestone: Task }) {}
}

export class EditMilestoneFail implements Action {
	type = actions.EDIT_MILESTONE_FAIL;

	constructor(public payload?: any) {}
}

// reorder milestone
export class ReorderMilestone implements Action {
	type = actions.REORDER_MILESTONE;

	constructor(public payload: { resolutionId: string, index: { from: number, to: number } }) {}
}

export class ReorderMilestoneSuccess implements Action {
	type = actions.REORDER_MILESTONE_SUCCESS;

	constructor(public payload: { resolutionId: string, index: { from: number, to: number } }) {}
}

export class ReorderMilestoneFail implements Action {
	type = actions.REORDER_MILESTONE_FAIL;

	constructor(public payload?: any) {}
}