import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'
import { VgCoreModule } from 'videogular2/core'
import { VgControlsModule } from 'videogular2/controls'
import { VgOverlayPlayModule } from 'videogular2/overlay-play'
import { VgBufferingModule } from 'videogular2/buffering'

import { MyApp } from './app.component';
import { HomePage, CityPage } from '../pages/home/home';
import { WebApi } from '../pages/providers/web_api.service';
import { AppMinimize } from '@ionic-native/app-minimize';
import { InformationPage } from '../pages/information/information'

// 导入 loginPage
import {LoginPage} from '../pages/login/login';

import{RegisterPage} from '../pages/register/register';
import {AllvideoPage} from "../pages/allvideo/allvideo";
import {HotvideoPage} from "../pages/hotvideo/hotvideo";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InformationPage,
    CityPage,
    LoginPage,
    RegisterPage,
    AllvideoPage,
    HotvideoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InformationPage,
    CityPage,
    LoginPage,
    RegisterPage,
    AllvideoPage,
    HotvideoPage
  ],
  providers: [
    AppMinimize,
    WebApi,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
 }
