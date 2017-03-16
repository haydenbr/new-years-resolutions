import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Settings } from '../../models';
import { AppState } from '../../reducers/app.state';
import { getSettingsState } from '../../reducers/settings.reducer';
import * as settingsActions from '../../actions/settings.actions';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
	settings: Observable<Settings>;
	@Input() title: string = 'New Years Resolutions';

	constructor(
		private store: Store<AppState>
	) {}

	ngOnInit() {
		this.settings = this.store.select(getSettingsState);
	}

	toggleReorderMode() {
		this.store.dispatch(new settingsActions.ToggleReorderMode());
	}
}