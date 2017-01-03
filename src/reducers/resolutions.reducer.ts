import { Action } from '@ngrx/store';
import omit from 'lodash/omit';
import { createSelector } from 'reselect';

import * as taskActions from '../actions/task.actions';
import { Task } from '../models';
import { reorder } from '../util';
import * as milstones from './milestones.reducer';

export interface State {
	loaded: boolean;
	loading: boolean;
	tasks: { [id: string]: Task },
	taskIds: string[],
	selectedTaskId: string
}

const initialState: State = {
	loaded: false,
	loading: false,
	tasks: {},
	taskIds: [],
	selectedTaskId: undefined
}

// ============= REDUCER =============

export function reducer(state: State = initialState, action: Action): State {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		return reducerHandle(state, action);
	}

	return milstones.reducer(state, action);
}

let reducerCases = {};

reducerCases[taskActions.actions.LOAD] =
	function (state: State, action: Action) {
		return Object.assign({}, state, { loading: true });
	}

reducerCases[taskActions.actions.LOAD_SUCCESS] =
	function (state: State, action: Action) {
		let tasksArray = action.payload, tasks = {}, taskIds = [];
				
		tasksArray.forEach((task) => {
			tasks[task.id] = task;
			taskIds.push(task.id);
		});

		return Object.assign({}, state, { loading: false, loaded: true, tasks, taskIds });
	}

reducerCases[taskActions.actions.ADD_TASK_SUCCESS] =
	function (state: State, action: Action) {
		let newTask = action.payload as Task;
		return Object.assign({}, state, {
			tasks: Object.assign({}, state.tasks, { [newTask.id]: newTask, }),
			taskIds: state.taskIds.concat(newTask.id)
		});
	}

reducerCases[taskActions.actions.REMOVE_TASK_SUCCESS] =
	function (state: State, action: Action) {
		let removedTask = action.payload as Task;
		return Object.assign({}, state, {
			tasks: omit(state.tasks, removedTask.id),
			taskIds: state.taskIds.filter((id) => { return id !== removedTask.id })
		});
	}

reducerCases[taskActions.actions.EDIT_TASK_SUCCESS] =
	function (state: State, action: Action) {
		let editedTask = action.payload as Task;
		return Object.assign({}, state, {
			tasks: Object.assign({}, state.tasks, { [editedTask.id]: editedTask })
		});
	}

reducerCases[taskActions.actions.REORDER_TASK_SUCCESS] =
	function (state: State, action: Action) {
		return Object.assign({}, state, { taskIds: reorder(state.taskIds, action.payload) });
	}

reducerCases[taskActions.actions.SELECT_TASK] =
	function (state: State, action: Action) {
		return Object.assign({}, state, { selectedTaskId: action.payload.id });
	}

// ============= SELECTORS =============

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTasksMap = (state: State) => state.tasks;
export const getTaskIds = (state: State) => state.taskIds;
export const getSelectedTaskId = (state: State) => state.selectedTaskId;
export const getTasks = createSelector(getTasksMap, getTaskIds, (tasks, ids) => {
	return ids.map((id) => { return tasks[id] });
});
export const getSelectedTask = createSelector(getTasksMap, getSelectedTaskId, (tasks, id) => {
	return tasks[id];
});
export const getMilestones = createSelector(getSelectedTask, (task) => { return task.milestones });