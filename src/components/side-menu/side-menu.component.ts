import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'side-menu',
	templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
	@Input() content: any;
	constructor() { }

	ngOnInit() { }
}