import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
	@Input() title: string = '';
	@Output() footerClick = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	clickFooter() {
		this.footerClick.emit();
	}
}