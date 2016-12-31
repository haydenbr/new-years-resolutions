import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Settings } from '../../models';
import * as reducers from '../../reducers';

import * as settingsActions from '../../actions/settings.actions';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
	settings: Observable<Settings>;
	@Input() 	title: string = 'New Years Resolutions';

	constructor(
		private store: Store<reducers.State>
	) {}

	ngOnInit() {
		this.settings = this.store.select(reducers.getSettingsState);
	}

	toggleReorderMode() {
		this.store.dispatch(new settingsActions.ToggleReorderMode());
	}
}