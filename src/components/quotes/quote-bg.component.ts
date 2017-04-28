import { Component, OnInit, Input } from '@angular/core';

import { QuoteService } from '../../services';
import { Task } from '../../models';

@Component({
	selector: 'quote-bg',
	templateUrl: './quote-bg.component.html'
})
export class QuoteBgComponent implements OnInit {
	@Input() tasks: Task[];
	quote: string = '';

	constructor(
		private quoteService: QuoteService
	) {}

	ngOnInit() {
		this.quote = this.quoteService.getRandomQuote();
	}
}