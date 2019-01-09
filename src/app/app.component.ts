import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import {LoginPage} from "../pages/login/login";
import {AllvideoPage} from "../pages/allvideo/allvideo";
import {HotvideoPage} from "../pages/hotvideo/hotvideo";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage=LoginPage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '我的', component: HomePage },
      { title: '全部视频', component: AllvideoPage },
      { title: '热门视频', component: HotvideoPage }
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

