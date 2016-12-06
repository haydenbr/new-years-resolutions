import { Injectable } from '@angular/core';

import { QuoteModel } from '../models';

@Injectable()
export class QuoteService {
	private quotes: string[];

	constructor() {
		this.quotes = new QuoteModel().get();
	}

	getRandomQuote(): string {
		return this.quotes[Math.floor(Math.random() * this.quotes.length)];
	}
}
