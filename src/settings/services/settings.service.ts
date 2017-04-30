import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {
	private readonly SETTINGS: string = 'settings';

	constructor(private storage: Storage) {
		this.initData();
	}

	initData() {
		this.getSettings()
			.subscribe((settings) => {
				if (!settings) {
					this.setSettings({});
				}
			});
	}

	getSettings(): Observable<any> {
		return Observable.fromPromise(this.storage.get(this.SETTINGS))
      .take(1);
	}

	setSettings(settings: any): Observable<any> {
		return Observable.fromPromise(this.storage.set(this.SETTINGS, settings))
      .take(1)
      .map(() => settings);
	}

	setDarkMode(darkMode: boolean): Observable<any> {
		return this.getSettings()
		.switchMap((settings) => {
			settings.darkMode = darkMode;
			return this.setSettings(settings)
		});
	}
}