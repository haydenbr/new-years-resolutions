import { Injectable } from '@angular/core';
import { App, NavOptions } from 'ionic-angular';

declare var require;

@Injectable()
export class NavigationService {
	private pages: any = {};

	constructor(private app: App) {
		this.initPages();
	}

	private initPages() {
		// believe it or not, this keeps the world from ending
		// let needsAssessment = require('../../needs-assessment/pages'),
		//     landing = require('../../landing/pages'),
		//     reporting = require('../../reporting'),
		// this.pages.BranchLandingPage = landing.BranchLandingPage;
		// this.pages.PublicGenericLandingPage = landing.PublicGenericLandingPage;
		// this.pages.ReportingPage = reporting.ReportingPage;
	}

	setRoot(page: string, params?: {}) {
		this.app.getRootNav().setRoot(this.pages[page], params);
	}

	push(page: string, params?: {}) {
		this.app.getRootNav().push(this.pages[page], params);
	}

	pop() {
		this.app.navPop();
	}

	popToRoot(opts?: NavOptions, done?: any) {
		this.app.getRootNav().popToRoot();
	}

	// TODO: implementation details
	getActive() {}
}
