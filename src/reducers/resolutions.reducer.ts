import { Action } from '@ngrx/store';
import omit from 'lodash/omit';
import { createSelector } from 'reselect';

import * as taskActions from '../actions/task.actions';
import * as milestoneAction from '../actions/milestone.actions';
import { Task } from '../models';
import { reorder } from '../util';

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

export function reducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case taskActions.actions.LOAD: {
			return Object.assign({}, state, { loading: true });
		}

		case taskActions.actions.LOAD_SUCCESS: {
			let tasksArray = action.payload, tasks = {}, taskIds = [];
			
			tasksArray.forEach((task) => {
				tasks[task.id] = task;
				taskIds.push(task.id);
			});

			return Object.assign({ loading: false, loaded: true, tasks, taskIds });
		}

		case taskActions.actions.ADD_TASK_SUCCESS: {
			let newTask = action.payload as Task;
			return Object.assign({}, state, {
				tasks: Object.assign(state.tasks,{ [newTask.id]: newTask, }),
				taskIds: state.taskIds.concat(newTask.id)
			});
		}

		case taskActions.actions.REMOVE_TASK_SUCCESS: {
			let removedTask = action.payload as Task;

			return Object.assign({}, state, {
				tasks: omit(state.tasks, removedTask.id),
				taskIds: state.taskIds.filter((id) => { return id !== removedTask.id })
			});
		}

		case taskActions.actions.EDIT_TASK_SUCCESS: {
			let editedTask = action.payload as Task;
			return Object.assign({}, state, {
				tasks: Object.assign(state.tasks, { [editedTask.id]: editedTask })
			});
		}

		case taskActions.actions.REORDER_TASK_SUCCESS: {
			return Object.assign({}, state, { taskIds: reorder(state.taskIds, action.payload) });
		}

		case taskActions.actions.SELECT_TASK: {
			return Object.assign({}, state, { selectedTaskId: action.payload.id });
		}

		case milestoneAction.actions.ADD_MILESTONE_SUCCESS: {
			// payload: { taskId, milestone }
			let taskId = action.payload.taskId,
					milesone = action.payload.milestone,
					task = state.tasks[taskId];

			return Object.assign({}, state, {
				tasks: Object.assign(state.tasks, {
					[taskId]: Object.assign(task, {
						milestones: task.milestones.concat(milesone)
					})
				})
			});
		}

		case milestoneAction.actions.REMOVE_MILESTONE_SUCCESS: {
			// payload: { taskId, milestone }
			let taskId = action.payload.taskId,
					milesone = action.payload.milestone,
					task = state.tasks[taskId];

			return Object.assign({}, state, {
				tasks: Object.assign(state.tasks, {
					[taskId]: Object.assign(task, {
						milestones: task.milestones.filter((m) => m.id !== milesone.id)
					})
				})
			});
		}

		case milestoneAction.actions.EDIT_MILESTONE_SUCCESS: {
			// payload: { taskId, milestone }
			let taskId = action.payload.taskId,
					milesone = action.payload.milestone,
					task = state.tasks[taskId];

			return Object.assign({}, state, {
				tasks: Object.assign(state.tasks, {
					[taskId]: Object.assign(task, {
						milestones: task.milestones.map((m) => {
							if (m.id === milesone.id) {
								return milesone;
							}
							return m;
						})
					})
				})
			});
		}

		case milestoneAction.actions.REORDER_MILESTONE_SUCCESS: {
			// payload: { taskId, milestone }
			let taskId = action.payload.taskId,
					index = action.payload.index,
					task = state.tasks[taskId];

			return Object.assign({}, state, {
				tasks: Object.assign(state.tasks, {
					[taskId]: Object.assign(task, {
						milestones: reorder(task.milestones, index)
					})
				})
			});
		}

		default: {
			return state;
		}
	}
}

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