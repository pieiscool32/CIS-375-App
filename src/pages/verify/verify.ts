import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
  const toast = this.toastCtrl.create({
    message: 'Verification Code: 3827',
    duration: 5000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }
}
