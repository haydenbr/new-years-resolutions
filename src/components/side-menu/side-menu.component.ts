import { Component, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Settings } from '../../models';

@Component({
	selector: 'side-menu',
	templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
	@Input() content: any;
	@Input() settings: Settings;
	@Output() toggleDarkMode = new Subject();

	constructor() {}

	ngOnInit() {
		
	}

	toggleDarkModeOutput($event) {
		this.toggleDarkMode.next($event.checked);
	}
}