import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Settings } from '../../models';

@Component({
	selector: 'side-menu',
	templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
	@Input() content: any;
	@Input() settings: Settings;
	@Output() toggleDarkMode = new EventEmitter();

	constructor() {}

	ngOnInit() {
		
	}

	toggleDarkModeOutput() {
		this.toggleDarkMode.emit();
	}
}