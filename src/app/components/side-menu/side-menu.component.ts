import { Component, Input, Output } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Settings } from '../../../settings/models';

@Component({
	selector: 'side-menu',
	templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent {
	@Input() content: any;
	@Input() settings: Settings;
	@Output() clearData = new Subject();
	@Output() toggleDarkMode = new Subject();

	constructor() {}

	clear() {
		this.clearData.next();
	}

	onToggleDarkMode($event) {
		this.toggleDarkMode.next($event.checked);
	}
}