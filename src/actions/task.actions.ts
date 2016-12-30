import { Action } from '@ngrx/store';

import { Task } from '../models';
import { actionType } from '../util';

export const actions = {
	ADD_TASK:             actionType('[Task] Add Task'),
  ADD_TASK_SUCCESS:     actionType('[Task] Add Task Success'),
  ADD_TASK_FAIL:        actionType('[Task] Add Task Fail'),
  REMOVE_TASK:          actionType('[Task] Remove Task'),
  REMOVE_TASK_SUCCESS:  actionType('[Task] Remove Task Success'),
  REMOVE_TASK_FAIL:     actionType('[Task] Remove Task Fail'),
	EDIT_TASK:          	actionType('[Task] Edit Task'),
  EDIT_TASK_SUCCESS:  	actionType('[Task] Edit Task Success'),
  EDIT_TASK_FAIL:     	actionType('[Task] Edit Task Fail'),
	REORDER_TASK:					actionType('[Task] Reorder Task'),
	REORDER_TASK_SUCCESS:	actionType('[Task] Reorder Task Success'),
	REORDER_TASK_FAIL:		actionType('[Task] Reorder Task Fail'),
  LOAD:                 actionType('[Task] Load'),
  LOAD_SUCCESS:         actionType('[Task] Load Success'),
  LOAD_FAIL:            actionType('[Task] Load Fail'),
	SELECT_TASK:					actionType('[Task] Select Task')
}

// Add a task
export class AddTask implements Action {
	type = actions.ADD_TASK;

	constructor(public payload: Task) {}
}

export class AddTaskSuccess implements Action {
	type = actions.ADD_TASK_SUCCESS;

	constructor(public payload: Task) {}
}

export class AddTaskFail implements Action {
	type = actions.ADD_TASK_FAIL;

	constructor(public payload: Task) {}
}

// remove a task
export class RemoveTask implements Action {
	type = actions.REMOVE_TASK;

	constructor(public payload: Task) {}
}

export class RemoveTaskSuccess implements Action {
	type = actions.REMOVE_TASK_SUCCESS;

	constructor(public payload: Task) {}
}

export class RemoveTaskFail implements Action {
	type = actions.REMOVE_TASK_FAIL;

	constructor(public payload: Task) {}
}

// edit a task
export class EditTask implements Action {
	type = actions.EDIT_TASK;

	constructor(public payload: Task) {}
}

export class EditTaskSuccess implements Action {
	type = actions.EDIT_TASK_SUCCESS;

	constructor(public payload: Task) {}
}

export class EditTaskFail implements Action {
	type = actions.EDIT_TASK_FAIL;

	constructor(public payload: Task) {}
}

// reorder task
export class ReorderTask implements Action {
	type = actions.REORDER_TASK;

	constructor(public payload: { to: number, from: number }) {}
}

export class ReorderTaskSuccess implements Action {
	type = actions.REORDER_TASK_SUCCESS;

	constructor(public payload: Task[]) {}
}

export class ReorderTaskFail implements Action {
	type = actions.REORDER_TASK_FAIL;

	constructor(public payload: Task[]) {}
}

// load tasks
export class LoadTasks implements Action {
	type = actions.LOAD;

	constructor() {}
}

export class LoadTaskSuccess implements Action {
	type = actions.LOAD_SUCCESS;

	constructor(public payload: Task[]) {}
}

export class LoadTaskFail implements Action {
	type = actions.LOAD_FAIL;

	constructor(public payload: any) {}
}

export class SelectTask implements Action {
	type = actions.SELECT_TASK;

	constructor(public payload: Task) {}
}