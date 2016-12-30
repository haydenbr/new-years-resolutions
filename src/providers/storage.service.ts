import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { reorderArray } from 'ionic-angular';

import * as uuid from 'uuid';

@Injectable()
export class StorageService {
	private readonly TASKS: string = 'tasks';
	// private readonly SETTINGS: string = 'settings';

	constructor(private storage: Storage) {
		// this.killSwitch();
	}

	// for debugging purposes
	killSwitch() {
		this.storage.set(this.TASKS, []);
	}

	getTasks() {
		return this.storage.get(this.TASKS);
	}

	setTasks(tasks) {
		return this.storage.set(this.TASKS, tasks);
	}

	addTask(task) {
		return this.getTasks()
			.then((tasks) => {
				task.id = uuid.v4();
				return tasks.concat(task);
			})
			.then(this.update);
	}

	removeTask(removeTask) {
		return this.getTasks()
			.then((tasks) => {
				console.log('all tasks', tasks);
				console.log('remove this one', removeTask);
				return tasks.filter(task => task.id !== removeTask.id);
			})
			.then(this.update);
	}

	updateTask(updatedTask) {
		return this.getTasks()
			.then((tasks) => {
				let idx = tasks.findIndex(task => task.id === updatedTask.id);
				return [ ...tasks.slice(0, idx), updatedTask, ...tasks.slice(idx+1) ];
			})
			.then(this.update);
	}

	reorderTasks(index) {
		return this.getTasks().then((tasks) => {
			return reorderArray(tasks, index);
		})
		.then(this.update)
	}

	update = (tasks): Promise<any> => {
		return this.setTasks(tasks).then(() => tasks);
	}
}