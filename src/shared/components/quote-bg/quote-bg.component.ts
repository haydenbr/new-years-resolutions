import { Component, OnInit, Input } from '@angular/core';

import { QuoteService } from '../../../core/services';

@Component({
	selector: 'quote-bg',
	templateUrl: 'quote-bg.component.html'
})
export class QuoteBgComponent implements OnInit {
	@Input() showQuotes: boolean = false;
	quote: string = '';

	constructor(
		private quoteService: QuoteService
	) {}

	ngOnInit() {
		this.quote = this.quoteService.getRandomQuote();
	}
}