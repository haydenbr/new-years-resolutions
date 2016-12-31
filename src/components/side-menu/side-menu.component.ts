import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'side-menu',
	templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
	@Input() content: any;
	@Output() toggleDarkMode = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	toggleDarkModeOutput() {
		this.toggleDarkMode.emit();
	}
}