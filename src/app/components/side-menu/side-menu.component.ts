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
	@Output() toggleDarkMode = new Subject();

	constructor() {}

	toggleDarkModeOutput($event) {
		this.toggleDarkMode.next($event.checked);
	}
}