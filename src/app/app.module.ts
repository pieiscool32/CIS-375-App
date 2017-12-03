import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { VerifyPage } from '../pages/verify/verify';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { AddPage } from '../pages/add/add';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountPage,
    SettingsPage,
    LoginPage,
    VerifyPage,
    EditItemPage,
    AddPage
  ],
  imports: [
      BrowserModule,
      HttpModule,
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    SettingsPage,
    LoginPage,
    VerifyPage,
    EditItemPage,
    AddPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}