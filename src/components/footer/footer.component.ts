import { Component, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
	@Input() title: string = '';
	@Output() footerClick = new Subject();

	constructor() { }

	ngOnInit() { }

	clickFooter() {
		this.footerClick.next();
	}
}