import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as settingsActions from '../../../actions/settings.actions';
import * as reducers from '../../../reducers';
import { Settings } from '../../../settings/models';

@Component({
	selector: 'navbar',
	templateUrl: 'navbar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
	settings: Observable<Settings>;
	@Input() title: string = 'New Years Resolutions';

	constructor(private store: Store<reducers.State>) {}

	ngOnInit() {
		this.settings = this.store.select(reducers.getSettingsState);
	}

	toggleReorderMode() {
		this.store.dispatch(new settingsActions.ToggleReorderMode());
	}
}
