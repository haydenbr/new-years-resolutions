import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import * as uuid from 'uuid';

import { Task } from '../models';
import { reorder } from '../../util';

@Injectable()
export class ResolutionService {
	private readonly DATA_KEY: string = 'resolutions';

	constructor(private storage: Storage) {
		this.initData();
	}

	clearResolutions(): Observable<any> {
		return this.setResolutions([]);
	}

	initData() {
		this.getResolutions()
			.subscribe((resolutions) => {
				if (!resolutions) {
					this.setResolutions([]);
				}
			});
	}

	getResolutions(): Observable<Task[]> {
		return Observable.fromPromise(this.storage.get(this.DATA_KEY))
			.take(1);
	}

	getResolution(id: string): Observable<Task> {
		return this.getResolutions()
			.map(r => r.find((t) => t.id === id));
	}

	setResolutions(resolutions): Observable<any> {
		return Observable.fromPromise(this.storage.set(this.DATA_KEY, resolutions))
			.take(1)
			.map(() => resolutions)
	}

	addResolution(resolution: Task): Observable<Task> {
		resolution.id = uuid.v4();
		resolution.milestones = [];

		return this.getResolutions()
			.map(resolutions => resolutions.concat(resolution))
			.switchMap(resolutions => this.setResolutions(resolutions))
			.map(() => resolution);
	}

	removeResolution(removedTask): Observable<Task[]> {
		return this.getResolutions()
			.map((resolutions) => resolutions.filter(resolution => resolution.id !== removedTask.id))
			.switchMap(resolutions => this.setResolutions(resolutions))
			.map(() => removedTask);
	}

	updateResolution(updatedTask): Observable<Task> {
		return this.getResolutions()
			.map((resolutions) => {
				let idx = resolutions.findIndex(resolution => resolution.id === updatedTask.id);
				return [ ...resolutions.slice(0, idx), updatedTask, ...resolutions.slice(idx+1) ];
			})
			.switchMap(resolutions => this.setResolutions(resolutions))
			.map(() => updatedTask);
	}

	reorderResolutions(index: { from: number, to: number }): Observable<Task[]> {
		return this.getResolutions()
			.map((resolutions) => reorder(resolutions, index))
			.switchMap(resolutions => this.setResolutions(resolutions))
	}

	addMilestone(id: string, milestone: Task): Observable<Task> {
		milestone.id = uuid.v4();

		return this.getResolution(id)
			.map((resolution) => {
				resolution.milestones.push(milestone);
				return resolution;
			})
			.switchMap(resolution => this.updateResolution(resolution));
	}

	removeMilestone(id: string, removedMilestone: Task): Observable<any> {
		return this.getResolution(id)
			.map((resolution) => {
				resolution.milestones = resolution.milestones.filter((m) => m.id !== removedMilestone.id);
				return resolution;
			})
			.switchMap(resolution => this.updateResolution(resolution));
	}

	updateMilestone(id: string, updatedMilestone: Task): Observable<any> {
		return this.getResolution(id)
			.map((resolution) => {
				resolution.milestones = resolution.milestones.map(m => {
					if (m.id === updatedMilestone.id) {
						return updatedMilestone
					}
					return m;
				});

				return resolution;
			})
			.switchMap(resolution => this.updateResolution(resolution));
	}

	reorderMilestone(id: string, index: { from: number, to: number }): Observable<any> {
		return this.getResolution(id)
			.map((resolution) => {
				resolution.milestones = reorder(resolution.milestones, index);

				return resolution;
			})
			.switchMap(resolution => this.updateResolution(resolution));
	}
}