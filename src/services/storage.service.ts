import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Task } from '../models';
import { reorder } from '../util';

@Injectable()
export class StorageService {
	private readonly TASKS: string = 'tasks';
	private readonly SETTINGS: string = 'settings';

	constructor(private storage: Storage) {
		this.initData();
		// this.killSwitch();
	}

	// for debugging purposes when local storage gets crapped up
	killSwitch() {
		this.storage.set(this.TASKS, []);
	}

	initData() {
		this.getResolutions().then((tasks) => {
			if (!tasks) {
				this.setResolutions([]);
			}
		});

		this.getSettings().then((settings) => {
			if (!settings) {
				this.setSettings({});
			}
		});
	}

	getResolutions(): Promise<Task[]> {
		return this.storage.get(this.TASKS);
	}

	setResolutions(tasks): Promise<any> {
		return this.storage.set(this.TASKS, tasks).then(() => tasks);
	}

	addResolution(task): Promise<Task> {
		return this.getResolutions()
			.then((tasks) => {
				return tasks.concat(task);
			})
			.then(this.setResolutions)
			.then(() => { return task; });
	}

	removeResolution(removedTask): Promise<Task[]> {
		return this.getResolutions()
			.then((tasks) => {
				return tasks.filter(task => task.id !== removedTask.id);
			})
			.then(this.setResolutions)
			.then(() => { return removedTask; });
	}

	updateResolution = (updatedTask): Promise<Task> => {
		return this.getResolutions()
			.then((tasks) => {
				let idx = tasks.findIndex(task => task.id === updatedTask.id);
				return [ ...tasks.slice(0, idx), updatedTask, ...tasks.slice(idx+1) ];
			})
			.then(this.setResolutions)
			.then(() => { return updatedTask; });
	}

	reorderResolutions(index: { from: number, to: number }): Promise<Task[]> {
		return this.getResolutions().then((tasks) => {
			return reorder(tasks, index);
		})
		.then(this.setResolutions)
	}

	addMilestone(taskId: string, milestone: Task): Promise<Task> {
		milestone.milestones = undefined;
		return this.getResolutions().then((tasks: Task[]) => {
			let task = tasks.find((t) => { return t.id === taskId });
			task.milestones.push(milestone);
			return task;
		})
		.then(this.updateResolution);
	}

	removeMilestone(taskId: string, removedMilestone: Task) {
		return this.getResolutions().then((tasks: Task[]) => {
			let task = tasks.find((t) => { return t.id === taskId });
			task.milestones = task.milestones.filter((m) => { return m.id !== removedMilestone.id })
			return task;
		})
		.then(this.updateResolution);
	}

	updateMilestone(taskId: string, updatedMilestone: Task) {
		return this.getResolutions().then((tasks: Task[]) => {
			let task = tasks.find((t) => { return t.id === taskId });
			task.milestones = task.milestones.map((m) => {
				if (m.id === updatedMilestone.id) {
					return updatedMilestone;
				}
				return m;
			});
			return task;
		})
		.then(this.updateResolution);
	}

	reorderMilestone(taskId: string, index: { from: number, to: number }) {
		return this.getResolutions().then((tasks: Task[]) => {
			let task = tasks.find((t) => { return t.id === taskId });
			task.milestones = reorder(task.milestones, index);

			return task;
		})
		.then(this.updateResolution);
	}

	getSettings(): Promise<any> {
		return this.storage.get(this.SETTINGS);
	}

	setSettings(settings: any): Promise<any> {
		return this.storage.set(this.SETTINGS, settings);
	}

	toggleDarkMode(toggle: boolean) {
		return this.getSettings().then((settings) => {
			settings.darkMode = toggle;
			return settings;
		})
		.then(this.updateSettings);
	}

	private updateSettings = (settings): Promise<any> => {
		return this.setSettings(settings).then(() => settings);
	}
}