import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ResolutionsPage } from '../pages';
import { SettingsService } from '../providers';
import { Settings } from '../models';
import * as reducers from '../reducers';
import * as settingsActions from '../actions/settings.actions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ResolutionsPage;
  settings: Observable<Settings>;

  constructor(
    platform: Platform,
    public settingsService: SettingsService,
    private store: Store<reducers.State>
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.settings = this.store.select(reducers.getSettingsState);
  }

  onToggleDarkMode() {
    this.store.dispatch(new settingsActions.ToggleDarkMode());
  }
}
