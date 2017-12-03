import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerifyPage } from '../verify/verify';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {HomePage} from "../home/home";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    number = {
        val: ''
    }
    constructor(private navCtrl: NavController, private storage: Storage, private http: Http) {
    }

    goHome() {
        this.navCtrl.setRoot(HomePage);
    }

    smsForm(params) {
        let url = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth?";
        let command = "command=sendCode&";
        let phone = "number=+1"+this.number.val;
        console.log("sent: "+url+command+phone);
        this.http.put(url+command+phone, {}).map(res => res.json())
            .subscribe(data => {
                console.log("got back:" + data.status + " " +data.body);
                if(data.status === 200) {
                    this.storage.set("phone","+1"+this.number.val);
                    console.log("go to verify");
                    this.navCtrl.setRoot(VerifyPage);
                }
            }, error => {
                console.log(error);
            });
    }

    callForm(params) {
        let url = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth?";
        let command = "command=callCode&";
        let phone = "number=+1"+this.number.val;
        console.log("sent: "+url+command+phone);
        this.http.put(url+command+phone, {}).map(res => res.json())
            .subscribe(data => {
                console.log("got back:" + data.status + " ", JSON.stringify(data.body));
                if(data.status === 200) {
                    console.log("go to verify");
                    this.storage.set("phone","+1"+this.number.val);
                    if (!params) params = {};
                    this.navCtrl.setRoot(VerifyPage);
                }
            }, error => {
                console.log(JSON.stringify(error));
            });
    }
}
