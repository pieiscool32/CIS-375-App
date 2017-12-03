import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/';
import { EditItemPage } from '../edit-item/edit-item';
import { AddPage } from '../add/add';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    listItems: any
  constructor(private loadingCtrl: LoadingController, private navCtrl: NavController, private storage: Storage, private http: Http) {
      let loading = this.presentLoading();
      this.storage.get('products')
          .then((list) => {
              if(list != undefined) {
                  this.listItems = list;
                  loading.dismiss();
              } else {
                  this.getProducts(loading);
              }
      });
  }

  ionViewWillEnter() {
        this.storage.get('products')
            .then((list) => {
                if(list != undefined) {
                    this.listItems = list;
                }
            })
  }

    presentLoading() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        return loading;
    }

    getProducts(loading) {
        this.storage.get("phone").then((num) => {
            let uri = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-user?";
            let command = "command=getUserProducts&";
            let phone = "number=7342729836"; //num.substring(2,num.length)
            let url= uri + command + phone;
            console.log(`sent: ${url}`);
            this.http.get(url).map(res => res.json())
                .subscribe(data => {
                    console.log("got back:", JSON.stringify(data));
                    this.listItems = data;
                    this.storage.set('products', data);
                    loading.dismiss();
                }, error => {
                    console.log("error", JSON.stringify(error));
                });
        });
    }

    clear() {
        this.storage.set('products', undefined);
    }

  goToProd(params){
    if (!params) params = {};
    else params = {item:params};
    this.navCtrl.push(EditItemPage, params);
  }

  goToAdd(params) {
    if (!params) params = {};
    this.navCtrl.push(AddPage);
  }
}
