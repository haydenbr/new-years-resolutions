import { Injectable } from '@angular/core';
import { App, NavOptions } from 'ionic-angular';

import 'rxjs/add/operator/map';

declare var require;

@Injectable()
export class NavigationService {
  private pages: any = {};

  constructor(
    private app: App,
  ) {
    this.initPages();
  }

  private initPages() {
    // believe it or not, this keeps the world from ending
    // let needsAssessment = require('../../needs-assessment/pages'),
    //     landing = require('../../landing/pages'),
    //     reporting = require('../../reporting'),
    //     snapshot = require('../../snapshot'),
    //     styleguide = require('../../styleguide'),
    //     reco = require('../../recommendation/pages'),
    //     security = require('../../security/pages');

    // this.pages.BranchLandingPage = landing.BranchLandingPage;
    // this.pages.BranchLoginPage = security.BranchLoginPage;
    // this.pages.LoginPage = security.LoginPage;
    // this.pages.PublicGenericLandingPage = landing.PublicGenericLandingPage;
    // this.pages.PublicRecommendationPage = reco.PublicRecommendationPage;
    // this.pages.RecentRecommendationsPage = reco.RecentRecommendationsPage;
    // this.pages.SolutionPage = reco.SolutionPage;
    // this.pages.AssessmentLandingPage = needsAssessment.AssessmentLandingPage;
    // this.pages.AssessmentFlowPage = needsAssessment.AssessmentFlowPage;
    // this.pages.BBSCSnapshotPage = snapshot.BBSCSnapshotPage;
    // this.pages.UserSnapshotPage = snapshot.UserSnapshotPage;
    // this.pages.ReportingPage = reporting.ReportingPage;
    // this.pages.StyleguidePage = styleguide.StyleguidePage;
  }

  setRoot(page: string, params?: {}) {
    this.app.getRootNav().setRoot(this.pages[page], params);
  }

  push(page: string, params?: {}) {
    this.app.getRootNav().push(this.pages[page], params);
  }

  pop() {
    this.app.navPop();
  }

  popToRoot(opts?: NavOptions, done?: any) {
    this.app.getRootNav().popToRoot();
  }

  // TODO: implementation details
  getActive() {

  }
}
