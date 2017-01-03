import { Action } from '@ngrx/store';
import omit from 'lodash/omit';
import { createSelector } from 'reselect';

import { State } from './resolutions.reducer';
import * as milestoneAction from '../actions/milestone.actions';
import { Task } from '../models';
import { reorder } from '../util';

export function reducer(state: State, action: Action): State {
	let reducerHandle = reducerCases[action.type];

	if (reducerHandle) {
		let taskId = action.payload.taskId,
				task = state.tasks[taskId];

		return Object.assign({}, state, {
			tasks: Object.assign({}, state.tasks, {
				[taskId]: Object.assign({}, task, {
					milestones: reducerHandle(task, action.payload)
				})
			})
		});
	}

	return state;
}

let reducerCases = {};

reducerCases[milestoneAction.actions.ADD_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		return task.milestones.concat(payload.milestone);
	};

reducerCases[milestoneAction.actions.REMOVE_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		return task.milestones.filter((m) => m.id !== payload.milestone.id);
	};

reducerCases[milestoneAction.actions.EDIT_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		let milestone = payload.milestone;

		return task.milestones.map((m) => {
			if (m.id === milestone.id) {
				return milestone;
			}
			return m;
		});
	};

reducerCases[milestoneAction.actions.REORDER_MILESTONE_SUCCESS] =
	function (task: Task, payload) {
		return reorder(task.milestones, payload.index);
	};