import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
	private readonly TASKS: string = 'tasks';
	// private readonly SETTINGS: string = 'settings';

	constructor(private storage: Storage) {}

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

	update = (tasks): Promise<any> => {
		console.log('inside of storage servicee', tasks);
		return this.setTasks(tasks);
	}
}