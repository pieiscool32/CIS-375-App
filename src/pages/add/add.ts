import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  searchResults: any
  search: string
  constructor(public navCtrl: NavController, private storage: Storage, private http: Http) {
  }

  doSearch() {
      let name = this.search;
      name = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

      this.storage.get(name)
          .then((prod) => {
              if(prod != undefined) {
                  this.searchResults = prod;
              } else {
                  let uri = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-product?";
                  let command = "command=doSearch&";
                  let prod = "name="+name;
                  let url= uri + command + prod;
                  console.log(`sent: ${url}`);
                  this.http.get(url).map(res => res.json())
                      .subscribe(data => {
                          console.log("got back:", JSON.stringify(data));
                          this.storage.set(name, data);
                          this.searchResults = data;
                      }, error => {
                          console.log("error", JSON.stringify(error));
                          this.searchResults = { name: "Not Found" };
                      });
              }
          });
  }

  save(prod) {
      this.storage.get('products')
          .then((list) => {
              list.push(prod);
              this.storage.set('products', list);
          });
      this.searchResults = undefined;
  }

  empty() {
      this.search = null;
      this.searchResults = undefined;
  }
}
