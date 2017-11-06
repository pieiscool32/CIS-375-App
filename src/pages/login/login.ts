import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerifyPage } from '../verify/verify';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToVerify(params){
    if (!params) params = {};
    this.navCtrl.setRoot(VerifyPage);
  }goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
}
