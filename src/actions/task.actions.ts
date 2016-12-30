import { Action } from '@ngrx/store';

import { Task } from '../models';
import { actionType } from '../util';

export const actions = {
	ADD_TASK:             actionType('[Task Collection] Add Task'),
  ADD_TASK_SUCCESS:     actionType('[Task Collection] Add Task Success'),
  ADD_TASK_FAIL:        actionType('[Task Collection] Add Task Fail'),
  REMOVE_TASK:          actionType('[Task Collection] Remove Task'),
  REMOVE_TASK_SUCCESS:  actionType('[Task Collection] Remove Task Success'),
  REMOVE_TASK_FAIL:     actionType('[Task Collection] Remove Task Fail'),
	EDIT_TASK:          	actionType('[Task Collection] Edit Task'),
  EDIT_TASK_SUCCESS:  	actionType('[Task Collection] Edit Task Success'),
  EDIT_TASK_FAIL:     	actionType('[Task Collection] Edit Task Fail'),
	REORDER_TASK:					actionType('[Task Collection] Reorder Task'),
	REORDER_TASK_SUCCESS:	actionType('[Task Collection] Reorder Task Success'),
	REORDER_TASK_FAIL:		actionType('[Task Collection] Reorder Task Fail'),
  LOAD:                 actionType('[Task Collection] Load'),
  LOAD_SUCCESS:         actionType('[Task Collection] Load Success'),
  LOAD_FAIL:            actionType('[Task Collection] Load Fail'),
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