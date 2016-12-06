import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ResolutionsPage } from '../pages';
import { SettingsService } from '../services';
import { Settings } from '../models';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ResolutionsPage;
  settings: Settings;

  constructor(platform: Platform, public settingsService: SettingsService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.settings = this.settingsService.settings;
  }

  updateSettings() {
    this.settingsService.update();
  }
}
