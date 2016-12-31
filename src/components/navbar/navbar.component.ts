import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';

import { Settings } from '../../models';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
	@Input() 	settings: Settings;
	@Input() 	title;
	@Output() toggleReorder = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	toggleReorderOutput() {
		this.toggleReorder.emit();
	}
}