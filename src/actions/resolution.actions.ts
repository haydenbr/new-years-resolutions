import { Action } from '@ngrx/store';

import { Task } from '../resolution/models';

import { actionType } from './action-type';

export const actions = {
	CREATE: actionType('[Resolution] Create'),
	CREATE_SUCCESS: actionType('[Resolution] Create Success'),
	CREATE_FAIL: actionType('[Resolution] Create Fail'),
	DELETE: actionType('[Resolution] Delete'),
	DELETE_SUCCESS: actionType('[Resolution] Delete Success'),
	DELETE_FAIL: actionType('[Resolution] Delete Fail'),
	DELETE_ALL: actionType('[Resolution] Delete All'),
	DELETE_ALL_FAIL: actionType('[Resolution] Delete All Fail'),
	DELETE_ALL_SUCCESS: actionType('[Resolution] Delete All Success'),
	GET_ALL: actionType('[Resolution] Get All'),
	GET_ALL_SUCCESS: actionType('[Resolution] Get All Success'),
	GET_ALL_FAIL: actionType('[Resolution] Get All Fail'),
	REORDER: actionType('[Resolution] Reorder'),
	REORDER_SUCCESS: actionType('[Resolution] Reorder Success'),
	REORDER_FAIL: actionType('[Resolution] Reorder Fail'),
	SET_CURRENT: actionType('[Resolution] Set Current'),
	UPDATE: actionType('[Resolution] Update'),
	UPDATE_SUCCESS: actionType('[Resolution] Update Success'),
	UPDATE_FAIL: actionType('[Resolution] Update Fail'),
};

export class Create implements Action {
	type = actions.CREATE;

	constructor(public payload: Task) {}
}

export class CreateSuccess implements Action {
	type = actions.CREATE_SUCCESS;

	constructor(public payload: Task) {}
}

export class CreateFail implements Action {
	type = actions.CREATE_FAIL;

	constructor(public payload: Task) {}
}

export class Delete implements Action {
	type = actions.DELETE;

	constructor(public payload: Task) {}
}

export class DeleteSuccess implements Action {
	type = actions.DELETE_SUCCESS;

	constructor(public payload: Task) {}
}

export class DeleteFail implements Action {
	type = actions.DELETE_FAIL;

	constructor(public payload: Task) {}
}

export class DeleteAll implements Action {
	type = actions.DELETE_ALL;

	constructor(public payload?: any) {}
}

export class DeleteAllFail implements Action {
	type = actions.DELETE_ALL_FAIL;

	constructor(public payload?: any) {}
}

export class DeleteAllSuccess implements Action {
	type = actions.DELETE_ALL_SUCCESS;

	constructor(public payload?: any) {}
}

export class Update implements Action {
	type = actions.UPDATE;

	constructor(public payload: Task) {}
}

export class UpdateSuccess implements Action {
	type = actions.UPDATE_SUCCESS;

	constructor(public payload: Task) {}
}

export class UpdateFail implements Action {
	type = actions.UPDATE_FAIL;

	constructor(public payload: Task) {}
}

export class Reorder implements Action {
	type = actions.REORDER;

	constructor(public payload: { to: number; from: number }) {}
}

export class ReorderSuccess implements Action {
	type = actions.REORDER_SUCCESS;

	constructor(public payload: { to: number; from: number }) {}
}

export class ReorderFail implements Action {
	type = actions.REORDER_FAIL;

	constructor(public payload: { to: number; from: number }) {}
}

export class GetAll implements Action {
	type = actions.GET_ALL;

	constructor() {}
}

export class GetAllSuccess implements Action {
	type = actions.GET_ALL_SUCCESS;

	constructor(public payload: Task[]) {}
}

export class GetAllFail implements Action {
	type = actions.GET_ALL_FAIL;

	constructor(public payload: any) {}
}

export class SetCurrent implements Action {
	type = actions.SET_CURRENT;

	constructor(public payload: Task) {}
}

export type ResolutionAction =
	| Create
	| CreateFail
	| CreateSuccess
	| Delete
	| DeleteFail
	| DeleteSuccess
	| DeleteAll
	| DeleteAllFail
	| DeleteAllSuccess
	| Update
	| UpdateFail
	| UpdateSuccess
	| Reorder
	| ReorderFail
	| ReorderSuccess
	| SetCurrent;
