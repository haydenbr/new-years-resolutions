import { Action } from '@ngrx/store';

import * as taskActions from '../actions/task.actions';
import { Task } from '../models';

export interface State {
	loaded: boolean;
	loading: boolean;
	tasks: Task[],
	selectedTask: Task
}

const initialState: State = {
	loaded: false,
	loading: false,
	tasks: [],
	selectedTask: undefined
}

export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case taskActions.actions.LOAD: {
			return Object.assign({}, state, { loading: true });
		}

		case taskActions.actions.LOAD_SUCCESS: {
			return { loading: false, loaded: true, tasks: action.payload };
		}

		case taskActions.actions.REMOVE_TASK_SUCCESS: {
			let removedTask = action.payload as Task;
			return Object.assign({}, state, {
				tasks: state.tasks.filter(task => task.id !== removedTask.id)
			});
		}

		case taskActions.actions.EDIT_TASK_SUCCESS: {
			let editedTask = action.payload as Task;
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					return (editedTask.id === task.id) ? editedTask : task;
				})
			});
		}

		case taskActions.actions.REORDER_TASK_SUCCESS: {
			return Object.assign({}, state, { tasks: action.payload });
		}

		case taskActions.actions.ADD_TASK_SUCCESS: {
			let newTask = action.payload as Task;
			return Object.assign({}, state, { tasks: state.tasks.concat(newTask)});
		}

		case taskActions.actions.SELECT_TASK: {
			return Object.assign({}, state, { selectedTask: action.payload });
		}

		default: {
			return state;
		}
	}
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTasks = (state: State) => state.tasks;
export const getSelectedTask = (state: State) => state.selectedTask;