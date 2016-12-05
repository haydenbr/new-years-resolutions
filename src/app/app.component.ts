import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ResolutionsPage } from '../pages';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ResolutionsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
