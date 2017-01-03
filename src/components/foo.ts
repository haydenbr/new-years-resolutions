import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'foo',
	template: `
		<ion-item>
			<ion-icon *ngIf="showMe" name="beer"></ion-icon>
		</ion-item>
	`
})
export class Foo implements OnInit {
	@Input() showMe: boolean = false;

	constructor() { }

	ngOnInit() { }
}