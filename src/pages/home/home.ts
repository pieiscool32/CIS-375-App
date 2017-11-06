import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditItemPage } from '../edit-item/edit-item';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  goToProd(params){
    if (!params) params = {};
    this.navCtrl.push(EditItemPage);
  }
  goToAdd(params) {
  	if (!params) params = {};
    this.navCtrl.push(AddPage);
  }
}
