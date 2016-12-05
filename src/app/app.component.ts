import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ResolutionsPage } from '../pages';
import { SettingsService, Settings } from '../services';

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
}
