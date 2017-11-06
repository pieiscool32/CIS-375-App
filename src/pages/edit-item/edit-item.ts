import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})
export class EditItemPage {
  product: string = "main";
  price: number = 50;

  constructor(public navCtrl: NavController) {
  }
  
}
