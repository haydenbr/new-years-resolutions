import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Settings } from './settings.interface';

@Injectable()
export class SettingsService {
	public settings: Settings;
	private key = 'settings';

	constructor(private storage: Storage) {
		this.defaultSettings();

		this.storage.get(this.key).then(settings => {
			this.settings = settings;
		});
	}

	set(key: string, value: any): void {
		this.settings[key] = value;
		this.storage.set(this.key, this.settings);
	}

	get(key: string): any {
		return this.settings[key];
	}

	private defaultSettings() {
		this.settings = {
			darkMode: false
		};
	}
}
