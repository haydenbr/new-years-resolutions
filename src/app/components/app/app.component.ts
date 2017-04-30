import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ResolutionPage } from '../../../resolution/pages';
import { Settings } from '../../../settings/models';
import { AppState } from '../../../reducers/app.state';
import { getSettingsState } from '../../../reducers/settings.reducer';
import * as settingsActions from '../../../actions/settings.actions';

@Component({
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage = ResolutionPage;
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
