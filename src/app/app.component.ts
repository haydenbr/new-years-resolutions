import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ResolutionsPage } from '../pages';
import { Settings } from '../models';
import { AppState } from '../reducers/app.state';
import { getSettingsState } from '../reducers/settings.reducer';
import * as settingsActions from '../actions/settings.actions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ResolutionsPage;
  settings: Observable<Settings>;

  constructor(
    platform: Platform,
    private store: Store<AppState>
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.settings = this.store.select(getSettingsState);
  }

  onToggleDarkMode(toggle) {
    this.store.dispatch(new settingsActions.ToggleDarkMode(toggle));
  }
}
