import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {
  code = {
      val: ''
  }
  error: string
  constructor(private navCtrl: NavController, private storage: Storage, private http: Http) {
  }

  checkCode(params){
    this.storage.get("phone").then((num) => {
      let url = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth?";
      let command = "command=verifyCode&";
      let code = "code="+this.code.val+"&";
      let phone = "number="+num;
      console.log("sent: "+ url+command+code+phone);
      this.http.get(url+command+code+phone).map(res => res.json())
          .subscribe(data => {
              console.log("got back:" + data.status + " " , JSON.stringify(data.body));
            if(data.body.indexOf("invalid") === -1) {
                if (!params) params = {};
                this.navCtrl.setRoot(HomePage);
            } else {
                this.error = data.body;
            }
          }, error => {
              console.log(JSON.stringify(error));
          });
    });
  }
}
