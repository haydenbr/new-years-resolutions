import { Injectable } from '@angular/core';

import { Task } from '../models';
import { StorageService } from '../providers'

@Injectable()
export class Id {
	_id: number;

	constructor(private storage: StorageService) {
		this.initId();
	}

	private initId() {
		this.storage.getTasks().then((tasks: Task[]) => {
			let lastTask = tasks.sort((taskA, taskB) => taskA.id - taskB.id)[tasks.length];
			if (!lastTask) {
				this._id = 0;
			} else {
				this._id = lastTask.id + 1;
			}
		});
	}

	id() {
		return this._id++;
	}
}