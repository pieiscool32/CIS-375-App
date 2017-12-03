import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})

export class EditItemPage {
    @ViewChild('lineCanvas') lineCanvas

    menu: string = "main"
    target: number
    slider: number
    product: string
    price: string
    desc: string
    lineChart: any
    drop: boolean
    unavailable: boolean
    doSMS: boolean
    interval: string
    saved: boolean
    asin: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: Http) {
      let data = this.navParams.get('item');
      let find = data.url.indexOf("/dp/B");
      this.asin = data.url.substring(find+4,find+14);
      this.lineChart = null;
      this.getData(this.asin);

      this.saved = true;
      this.product = data.name;
      this.price = data.price;
      this.desc = data.desc;
      //get the rest of the data (which isn't given)
      this.storage.get(this.asin)
          .then((info) => {
             if(info != undefined) {
                 this.target = info.target;
                 this.drop = info.drop;
                 this.unavailable = info.unavailable;
                 this.doSMS = info.doSMS;
                 this.interval = info.interval;
             } else {
                 this.target = data.price.substring(1, data.price.length);
                 this.drop = true;
                 this.unavailable = false;
                 this.doSMS = false;
                 this.interval = "5 Minutes";
             }
             this.slider = this.target;
          });
  }

  clear() {
        this.storage.set(this.asin, undefined);
  }

  save() {
        console.log(this.saved)
        if(this.saved) {
            this.saved = false;
        } else {
            this.saved = true;
            let obj = {
                target: this.target,
                drop: this.drop,
                unavailable: this.unavailable,
                doSMS: this.doSMS,
                interval: this.interval
            };
            this.storage.set(this.asin, obj);
        }
  }

  getData(asin) {
      let uri = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-product?";
      let command = "command=getProductHistory&";
      let name = "name="+asin;
      let url= uri + command + name;
      console.log(`sent: ${url}`);
      this.http.get(url).map(res => res.json())
          .subscribe(data => {
              console.log("got back:", JSON.stringify(data));
              let prices = [];
              let dates = [];
              data.forEach(function(obj) {
                  console.log(obj);
                  prices.push(obj.price.substring(1,obj.price.length));
                  dates.push(obj.time);
              });
              this.buildChart(prices,dates);
          }, error => {
              console.log("error", JSON.stringify(error));
          });
  }

  buildChart(price, dates) {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              labels: dates,
              datasets: [
                  {
                      label: "Price History",
                      fill: true,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: price,
                  }
              ]
          },
          options:
              {
                  scales:
                      {
                          xAxes: [{
                              display: false
                          }]
                      }
              }
      });
  }
}