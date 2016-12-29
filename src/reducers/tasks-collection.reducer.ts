import { Action } from '@ngrx/store';

import * as tasksCollection from '../actions/tasks-collection.actions';
import { Task } from '../models';

export interface State {
	loaded: boolean;
	loading: boolean;
	tasks: Task[]
}

const initialState: State = {
	loaded: false,
	loading: false,
	tasks: []
}

export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case tasksCollection.actions.LOAD: {
			return Object.assign({}, state, { loading: true });
		}

		case tasksCollection.actions.LOAD_SUCCESS: {
			return { loading: false, loaded: true, tasks: action.payload };
		}

		case tasksCollection.actions.REMOVE_TASK_SUCCESS: {
			let removedTask = action.payload as Task;
			return Object.assign({}, state, {
				tasks: state.tasks.filter(task => task.id !== removedTask.id)
			});
		}

		case tasksCollection.actions.EDIT_TASK_SUCCESS: {
			let editedTask = action.payload as Task,
					idx = state.tasks.findIndex(task => task.id === editedTask.id);
			return Object.assign({}, state, {
				tasks: [ ...state.tasks.slice(0, idx), editedTask, ...state.tasks.slice(idx+1) ]
			});
		}

		case tasksCollection.actions.REORDER_TASK_SUCCESS: {
			return Object.assign({}, state, { tasks: action.payload });
		}

		case tasksCollection.actions.ADD_TASK_SUCCESS: {
			let newTask = action.payload as Task;
			return Object.assign({}, state, { tasks: state.tasks.concat(newTask)});
		}

		default: {
			return state;
		}
	}
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTasks = (state: State) => state.tasks;