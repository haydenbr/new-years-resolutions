import { Component, Input, OnInit } from '@angular/core';

import { Task } from '../../models';

@Component({
	selector: 'task-list',
	templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
	@Input() tasks: Task[] = [];
	
	constructor() { }

	ngOnInit() {
		
	}
}