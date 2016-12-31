import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { reorderArray } from 'ionic-angular';

import * as uuid from 'uuid';

import { Task } from '../models';

@Injectable()
export class StorageService {
	private readonly TASKS: string = 'tasks';
	// private readonly SETTINGS: string = 'settings';

	constructor(private storage: Storage) {
		this.initData();
		// this.killSwitch();
	}

	// for debugging purposes when local storage gets crapped up
	killSwitch() {
		this.storage.set(this.TASKS, []);
	}

	initData() {
		this.getTasks().then((tasks) => {
			if (!tasks) {
				this.setTasks([]);
			}
		});
	}

	getTasks(): Promise<Task[]> {
		return this.storage.get(this.TASKS);
	}

	setTasks(tasks): Promise<any> {
		return this.storage.set(this.TASKS, tasks);
	}

	addTask(task): Promise<Task> {
		task.id = uuid.v4();
		return this.getTasks()
			.then((tasks) => {
				return tasks.concat(task);
			})
			.then(this.updateTasks)
			.then(() => { return task; });
	}

	removeTask(removeTask): Promise<Task[]> {
		return this.getTasks()
			.then((tasks) => {
				return tasks.filter(task => task.id !== removeTask.id);
			})
			.then(this.updateTasks)
			.then(() => { return removeTask; });
	}

	updateTask(updatedTask): Promise<Task> {
		return this.getTasks()
			.then((tasks) => {
				let idx = tasks.findIndex(task => task.id === updatedTask.id);
				return [ ...tasks.slice(0, idx), updatedTask, ...tasks.slice(idx+1) ];
			})
			.then(this.updateTasks)
			.then(() => { return updatedTask; });
	}

	reorderTasks(index: { from: number, to: number }): Promise<Task[]> {
		return this.getTasks().then((tasks) => {
			return reorderArray(tasks, index);
		})
		.then(this.updateTasks)
	}

	private updateTasks = (tasks): Promise<Task[]> => {
		return this.setTasks(tasks).then(() => tasks);
	}
}