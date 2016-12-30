import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Settings } from '../models';

@Injectable()
export class SettingsService {
  public settings: Settings;
  private readonly key: string = 'settings';

  constructor(private storage: Storage) {
    this.defaultSettings();

    this.storage.get(this.key).then(settings => {
      this.settings = Object.assign(this.settings, settings);
    });
  }

  get(key: string): any {
    return this.settings[key];
  }

  set(key: string, value: any): void {
    this.settings[key] = value;
    this.update();
  }

  update(): Promise<any> {
    return this.storage.set(this.key, this.settings);
  }

  private defaultSettings(): void {
    this.settings = {
      darkMode: false,
      editMode: false
    };
  }
}
