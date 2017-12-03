webpackJsonp([0],{

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditItemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditItemPage = (function () {
    function EditItemPage(navCtrl, navParams, storage, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.menu = "main";
        var data = this.navParams.get('item');
        var find = data.url.indexOf("/dp/B");
        this.asin = data.url.substring(find + 4, find + 14);
        this.lineChart = null;
        this.getData(this.asin);
        this.saved = true;
        this.product = data.name;
        this.price = data.price;
        this.desc = data.desc;
        //get the rest of the data (which isn't given)
        this.storage.get(this.asin)
            .then(function (info) {
            if (info != undefined) {
                _this.target = info.target;
                _this.drop = info.drop;
                _this.unavailable = info.unavailable;
                _this.doSMS = info.doSMS;
                _this.interval = info.interval;
            }
            else {
                _this.target = data.price.substring(1, data.price.length);
                _this.drop = true;
                _this.unavailable = false;
                _this.doSMS = false;
                _this.interval = "5 Minutes";
            }
            _this.slider = _this.target;
        });
    }
    EditItemPage.prototype.clear = function () {
        this.storage.set(this.asin, undefined);
    };
    EditItemPage.prototype.save = function () {
        console.log(this.saved);
        if (this.saved) {
            this.saved = false;
        }
        else {
            this.saved = true;
            var obj = {
                target: this.target,
                drop: this.drop,
                unavailable: this.unavailable,
                doSMS: this.doSMS,
                interval: this.interval
            };
            this.storage.set(this.asin, obj);
        }
    };
    EditItemPage.prototype.getData = function (asin) {
        var _this = this;
        var uri = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-product?";
        var command = "command=getProductHistory&";
        var name = "name=" + asin;
        var url = uri + command + name;
        console.log("sent: " + url);
        this.http.get(url).map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("got back:", JSON.stringify(data));
            var prices = [];
            var dates = [];
            data.forEach(function (obj) {
                console.log(obj);
                prices.push(obj.price.substring(1, obj.price.length));
                dates.push(obj.time);
            });
            _this.buildChart(prices, dates);
        }, function (error) {
            console.log("error", JSON.stringify(error));
        });
    };
    EditItemPage.prototype.buildChart = function (price, dates) {
        this.lineChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.lineCanvas.nativeElement, {
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
            options: {
                scales: {
                    xAxes: [{
                            display: false
                        }]
                }
            }
        });
    };
    return EditItemPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('lineCanvas'),
    __metadata("design:type", Object)
], EditItemPage.prototype, "lineCanvas", void 0);
EditItemPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-item',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/edit-item/edit-item.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      {{ product }}\n    </ion-title>\n  </ion-navbar>\n  \n  <ion-toolbar no-border-top>\n      <ion-buttons end>\n          <button  ion-button icon-only (click)="save()">\n              <ion-icon name="build" *ngIf="saved == true"></ion-icon>\n              <ion-icon name="checkmark" *ngIf="saved == false"></ion-icon>\n          </button>\n      </ion-buttons>\n      <ion-segment [(ngModel)]="menu">\n          <ion-segment-button value="main">\n              Main\n          </ion-segment-button>\n          <ion-segment-button value="notify">\n              Notifications\n          </ion-segment-button>\n          <ion-segment-button value="more">\n              Advanced\n          </ion-segment-button>\n      </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding id="page6">\n    <div [ngSwitch]="menu">\n        <ion-list *ngSwitchCase="\'main\'">\n            <ion-item>\n                <div class="show-list-numbers-and-dots">\n                    <p style="margin-top:0px;color:#000000;" text-wrap>\n                    {{ desc }}\n                    </p>\n                    <p style="color:#000000;" (click)="clear()">\n                    Current Price: {{ price }}\n                    </p>\n                </div>\n            </ion-item>\n            <ion-item *ngIf="saved == true">\n                Target: {{ target }}\n            </ion-item>\n            <ion-item *ngIf="saved == false">\n                <ion-range min="{{ slider*0.5 }}" max="{{ slider*1.5 }}" pin="true" step="0.5" color="positive" ng-value="target" name="price" [(ngModel)]="target">\n                    <ion-label range-left>\n                        Target\n                    </ion-label>\n                </ion-range>\n            </ion-item>\n            <ion-item>\n                <ion-spinner *ngIf="lineChart === null"></ion-spinner>\n                <canvas #lineCanvas></canvas>\n            </ion-item>\n        </ion-list>\n        \n        <ion-list *ngSwitchCase="\'notify\'">\n            <ion-item id="editItem-toggle1">\n                <ion-label>\n                    Price Drop\n                </ion-label>\n                <ion-toggle color="positive" checked="{{ drop }}" disabled="true" *ngIf="saved == true"></ion-toggle>\n                <ion-toggle color="positive" checked="{{ drop }}" *ngIf="saved == false"></ion-toggle>\n            </ion-item>\n            <ion-item id="editItem-toggle2">\n                <ion-label>\n                    Product Unavalible\n                </ion-label>\n                <ion-toggle color="positive" checked="{{ unavailable }}" disabled="true" *ngIf="saved == true"></ion-toggle>\n                <ion-toggle color="positive" checked="{{ unavailable }}" *ngIf="saved == false"></ion-toggle>\n            </ion-item>\n        </ion-list>\n        \n        <ion-list *ngSwitchCase="\'more\'" id="editItem-list4">\n            <ion-item>\n                <ion-label>\n                    SMS updates\n                </ion-label>\n                <ion-toggle color="positive" checked="{{ doSMS }}" disabled="true" *ngIf="saved == true"></ion-toggle>\n                <ion-toggle color="positive" checked="{{ doSMS }}" *ngIf="saved == false"></ion-toggle>\n            </ion-item>\n            <ion-item *ngIf="saved == true">\n                Update Interval: {{ interval }}\n            </ion-item>\n            <ion-item *ngIf="saved == false">\n                <ion-label>\n                    Update Interval\n                </ion-label>\n                <ion-select [(ngModel)]="interval">\n                    <ion-option>1 Minute</ion-option>\n                    <ion-option>5 Minutes</ion-option>\n                    <ion-option>15 Minutes</ion-option>\n                    <ion-option>1 Hour</ion-option>\n                    <ion-option>1 Day</ion-option>\n                </ion-select>\n            </ion-item>\n        </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/edit-item/edit-item.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]])
], EditItemPage);

//# sourceMappingURL=edit-item.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddPage = (function () {
    function AddPage(navCtrl, storage, http) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
    }
    AddPage.prototype.doSearch = function () {
        var _this = this;
        var name = this.search;
        name = name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        this.storage.get(name)
            .then(function (prod) {
            if (prod != undefined) {
                _this.searchResults = prod;
            }
            else {
                var uri = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-product?";
                var command = "command=doSearch&";
                var prod_1 = "name=" + name;
                var url = uri + command + prod_1;
                console.log("sent: " + url);
                _this.http.get(url).map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    console.log("got back:", JSON.stringify(data));
                    _this.storage.set(name, data);
                    _this.searchResults = data;
                }, function (error) {
                    console.log("error", JSON.stringify(error));
                    _this.searchResults = { name: "Not Found" };
                });
            }
        });
    };
    AddPage.prototype.save = function (prod) {
        var _this = this;
        this.storage.get('products')
            .then(function (list) {
            list.push(prod);
            _this.storage.set('products', list);
        });
        this.searchResults = undefined;
    };
    AddPage.prototype.empty = function () {
        this.search = null;
        this.searchResults = undefined;
    };
    return AddPage;
}());
AddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/add/add.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Add\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <form>\n    <ion-searchbar placeholder="Item Name" name="search" [(ngModel)]="search" (ionInput)="doSearch()" (ionClear)="empty()"></ion-searchbar>\n  </form>\n  <ion-list>\n    <ion-item *ngFor="let name of searchResults">\n      <button ion-button outline icon-only item-start clear (click)="save(name)">\n        <ion-icon name="add"></ion-icon>\n      </button>\n      {{ name.name }}\n    </ion-item>\n  </ion-list>\n  <div class="spacer" style="width:300px;height:20px;" id="add-spacer3"></div>\n  <h3 style="color:#000000;font-weight:400;text-align: center;" text-center>\n    Suggested Searches\n  </h3>\n  <ion-list>\n    <ion-item color="none">\n      Echo\n    </ion-item>\n    <ion-item color="none">\n      Anker Batteries\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/add/add.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], AddPage);

//# sourceMappingURL=add.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccountPage = (function () {
    function AccountPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/account/account.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Account\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page2">\n  <ion-list id="account-list5">\n    <ion-item color="none" id="account-list-item10">\n      <ion-avatar item-left>\n        <img />\n      </ion-avatar>\n      <h2>\n        User Name\n      </h2>\n    </ion-item>\n    <ion-item id="account-input5">\n      <ion-label></ion-label>\n      <ion-input type="text" placeholder="Name"></ion-input>\n    </ion-item>\n    <ion-item id="account-input6">\n      <ion-label></ion-label>\n      <ion-input type="email" placeholder="Email"></ion-input>\n    </ion-item>\n    <ion-item id="account-input7">\n      <ion-label></ion-label>\n      <ion-input type="tel" placeholder="123-555-1234"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button id="account-button6" ion-button color="stable" block>\n    Update\n  </button>\n</ion-content>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/account/account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
    }
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Settings\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <form>\n    <ion-item>\n      <ion-label>\n        Push Notifications\n      </ion-label>\n      <ion-toggle color="positive" checked="false"></ion-toggle>\n    </ion-item>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__verify_verify__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, storage, http) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        this.number = {
            val: ''
        };
    }
    LoginPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.smsForm = function (params) {
        var _this = this;
        var url = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth?";
        var command = "command=sendCode&";
        var phone = "number=+1" + this.number.val;
        console.log("sent: " + url + command + phone);
        this.http.put(url + command + phone, {}).map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("got back:" + data.status + " " + data.body);
            if (data.status === 200) {
                _this.storage.set("phone", "+1" + _this.number.val);
                console.log("go to verify");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__verify_verify__["a" /* VerifyPage */]);
            }
        }, function (error) {
            console.log(error);
        });
    };
    LoginPage.prototype.callForm = function (params) {
        var _this = this;
        var url = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth?";
        var command = "command=callCode&";
        var phone = "number=+1" + this.number.val;
        console.log("sent: " + url + command + phone);
        this.http.put(url + command + phone, {}).map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("got back:" + data.status + " ", JSON.stringify(data.body));
            if (data.status === 200) {
                console.log("go to verify");
                _this.storage.set("phone", "+1" + _this.number.val);
                if (!params)
                    params = {};
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__verify_verify__["a" /* VerifyPage */]);
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Login\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page4">\n  <form id="login-form" (ngSubmit)="goHome()">\n    <ion-list id="login-list2">\n      <ion-item id="login-input1">\n        <ion-label>1+</ion-label>\n        <ion-input type="tel" placeholder="1235551234" [(ngModel)]="number.val" name="number"></ion-input>\n      </ion-item>\n    </ion-list>\n    <div class="spacer" style="height:40px;" id="login-spacer1"></div>\n    <button id="login-button-sms" ion-button color="positive" block>\n      Text Code\n    </button>\n    <button (ng-click)="callForm()" id="login-button-call" ion-button color="positive" block>\n      Call Code\n    </button>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerifyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VerifyPage = (function () {
    function VerifyPage(navCtrl, storage, http) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        this.code = {
            val: ''
        };
    }
    VerifyPage.prototype.checkCode = function (params) {
        var _this = this;
        this.storage.get("phone").then(function (num) {
            var url = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-auth?";
            var command = "command=verifyCode&";
            var code = "code=" + _this.code.val + "&";
            var phone = "number=" + num;
            console.log("sent: " + url + command + code + phone);
            _this.http.get(url + command + code + phone).map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log("got back:" + data.status + " ", JSON.stringify(data.body));
                if (data.body.indexOf("invalid") === -1) {
                    if (!params)
                        params = {};
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.error = data.body;
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        });
    };
    return VerifyPage;
}());
VerifyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-verify',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/verify/verify.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Verify\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page5">\n  <form id="verify-form" (ngSubmit)="checkCode()">\n      <ion-item *ngIf="error != undefined">{{ error }}</ion-item>\n    <ion-list id="verify-list3">\n      <ion-item id="verify-input3">\n        <ion-label></ion-label>\n        <ion-input type="number" placeholder="1234" [(ngModel)]="code.val" name="code"></ion-input>\n      </ion-item>\n    </ion-list>\n    <div class="spacer" style="height:40px;" id="verify-spacer2"></div>\n    <button id="verify-button" ion-button color="positive" block>\n      Log in\n    </button>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/verify/verify.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], VerifyPage);

//# sourceMappingURL=verify.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(349);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_account_account__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_verify_verify__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_edit_item_edit_item__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_add_add__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_verify_verify__["a" /* VerifyPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_edit_item_edit_item__["a" /* EditItemPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_add_add__["a" /* AddPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_verify_verify__["a" /* VerifyPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_edit_item_edit_item__["a" /* EditItemPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_add_add__["a" /* AddPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_account_account__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.goToHome = function (params) {
        if (!params)
            params = {};
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.goToAccount = function (params) {
        if (!params)
            params = {};
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_account_account__["a" /* AccountPage */]);
    };
    MyApp.prototype.goToSettings = function (params) {
        if (!params)
            params = {};
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */]);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/app/app.html"*/'<ion-menu [content]="mainContent">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>\n        Menu\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content id="side-menu21">\n    <ion-list id="menu-list1">\n      <ion-item color="none" menuClose="" on-click="goToHome()" id="menu-list-item1">\n        Home\n      </ion-item>\n      <ion-item color="none" menuClose="" on-click="goToAccount()" id="menu-list-item2">\n        Account\n      </ion-item>\n      <ion-item color="none" menuClose="" on-click="goToSettings()" id="menu-list-item3">\n        Settings\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 210,
	"./af.js": 210,
	"./ar": 211,
	"./ar-dz": 212,
	"./ar-dz.js": 212,
	"./ar-kw": 213,
	"./ar-kw.js": 213,
	"./ar-ly": 214,
	"./ar-ly.js": 214,
	"./ar-ma": 215,
	"./ar-ma.js": 215,
	"./ar-sa": 216,
	"./ar-sa.js": 216,
	"./ar-tn": 217,
	"./ar-tn.js": 217,
	"./ar.js": 211,
	"./az": 218,
	"./az.js": 218,
	"./be": 219,
	"./be.js": 219,
	"./bg": 220,
	"./bg.js": 220,
	"./bn": 221,
	"./bn.js": 221,
	"./bo": 222,
	"./bo.js": 222,
	"./br": 223,
	"./br.js": 223,
	"./bs": 224,
	"./bs.js": 224,
	"./ca": 225,
	"./ca.js": 225,
	"./cs": 226,
	"./cs.js": 226,
	"./cv": 227,
	"./cv.js": 227,
	"./cy": 228,
	"./cy.js": 228,
	"./da": 229,
	"./da.js": 229,
	"./de": 230,
	"./de-at": 231,
	"./de-at.js": 231,
	"./de-ch": 232,
	"./de-ch.js": 232,
	"./de.js": 230,
	"./dv": 233,
	"./dv.js": 233,
	"./el": 234,
	"./el.js": 234,
	"./en-au": 235,
	"./en-au.js": 235,
	"./en-ca": 236,
	"./en-ca.js": 236,
	"./en-gb": 237,
	"./en-gb.js": 237,
	"./en-ie": 238,
	"./en-ie.js": 238,
	"./en-nz": 239,
	"./en-nz.js": 239,
	"./eo": 240,
	"./eo.js": 240,
	"./es": 241,
	"./es-do": 242,
	"./es-do.js": 242,
	"./es.js": 241,
	"./et": 243,
	"./et.js": 243,
	"./eu": 244,
	"./eu.js": 244,
	"./fa": 245,
	"./fa.js": 245,
	"./fi": 246,
	"./fi.js": 246,
	"./fo": 247,
	"./fo.js": 247,
	"./fr": 248,
	"./fr-ca": 249,
	"./fr-ca.js": 249,
	"./fr-ch": 250,
	"./fr-ch.js": 250,
	"./fr.js": 248,
	"./fy": 251,
	"./fy.js": 251,
	"./gd": 252,
	"./gd.js": 252,
	"./gl": 253,
	"./gl.js": 253,
	"./gom-latn": 254,
	"./gom-latn.js": 254,
	"./he": 255,
	"./he.js": 255,
	"./hi": 256,
	"./hi.js": 256,
	"./hr": 257,
	"./hr.js": 257,
	"./hu": 258,
	"./hu.js": 258,
	"./hy-am": 259,
	"./hy-am.js": 259,
	"./id": 260,
	"./id.js": 260,
	"./is": 261,
	"./is.js": 261,
	"./it": 262,
	"./it.js": 262,
	"./ja": 263,
	"./ja.js": 263,
	"./jv": 264,
	"./jv.js": 264,
	"./ka": 265,
	"./ka.js": 265,
	"./kk": 266,
	"./kk.js": 266,
	"./km": 267,
	"./km.js": 267,
	"./kn": 268,
	"./kn.js": 268,
	"./ko": 269,
	"./ko.js": 269,
	"./ky": 270,
	"./ky.js": 270,
	"./lb": 271,
	"./lb.js": 271,
	"./lo": 272,
	"./lo.js": 272,
	"./lt": 273,
	"./lt.js": 273,
	"./lv": 274,
	"./lv.js": 274,
	"./me": 275,
	"./me.js": 275,
	"./mi": 276,
	"./mi.js": 276,
	"./mk": 277,
	"./mk.js": 277,
	"./ml": 278,
	"./ml.js": 278,
	"./mr": 279,
	"./mr.js": 279,
	"./ms": 280,
	"./ms-my": 281,
	"./ms-my.js": 281,
	"./ms.js": 280,
	"./my": 282,
	"./my.js": 282,
	"./nb": 283,
	"./nb.js": 283,
	"./ne": 284,
	"./ne.js": 284,
	"./nl": 285,
	"./nl-be": 286,
	"./nl-be.js": 286,
	"./nl.js": 285,
	"./nn": 287,
	"./nn.js": 287,
	"./pa-in": 288,
	"./pa-in.js": 288,
	"./pl": 289,
	"./pl.js": 289,
	"./pt": 290,
	"./pt-br": 291,
	"./pt-br.js": 291,
	"./pt.js": 290,
	"./ro": 292,
	"./ro.js": 292,
	"./ru": 293,
	"./ru.js": 293,
	"./sd": 294,
	"./sd.js": 294,
	"./se": 295,
	"./se.js": 295,
	"./si": 296,
	"./si.js": 296,
	"./sk": 297,
	"./sk.js": 297,
	"./sl": 298,
	"./sl.js": 298,
	"./sq": 299,
	"./sq.js": 299,
	"./sr": 300,
	"./sr-cyrl": 301,
	"./sr-cyrl.js": 301,
	"./sr.js": 300,
	"./ss": 302,
	"./ss.js": 302,
	"./sv": 303,
	"./sv.js": 303,
	"./sw": 304,
	"./sw.js": 304,
	"./ta": 305,
	"./ta.js": 305,
	"./te": 306,
	"./te.js": 306,
	"./tet": 307,
	"./tet.js": 307,
	"./th": 308,
	"./th.js": 308,
	"./tl-ph": 309,
	"./tl-ph.js": 309,
	"./tlh": 310,
	"./tlh.js": 310,
	"./tr": 311,
	"./tr.js": 311,
	"./tzl": 312,
	"./tzl.js": 312,
	"./tzm": 313,
	"./tzm-latn": 314,
	"./tzm-latn.js": 314,
	"./tzm.js": 313,
	"./uk": 315,
	"./uk.js": 315,
	"./ur": 316,
	"./ur.js": 316,
	"./uz": 317,
	"./uz-latn": 318,
	"./uz-latn.js": 318,
	"./uz.js": 317,
	"./vi": 319,
	"./vi.js": 319,
	"./x-pseudo": 320,
	"./x-pseudo.js": 320,
	"./yo": 321,
	"./yo.js": 321,
	"./zh-cn": 322,
	"./zh-cn.js": 322,
	"./zh-hk": 323,
	"./zh-hk.js": 323,
	"./zh-tw": 324,
	"./zh-tw.js": 324
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 428;

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular___ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_item_edit_item__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_add__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(loadingCtrl, navCtrl, storage, http) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        var loading = this.presentLoading();
        this.storage.get('products')
            .then(function (list) {
            if (list != undefined) {
                _this.listItems = list;
                loading.dismiss();
            }
            else {
                _this.getProducts(loading);
            }
        });
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('products')
            .then(function (list) {
            if (list != undefined) {
                _this.listItems = list;
            }
        });
    };
    HomePage.prototype.presentLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    HomePage.prototype.getProducts = function (loading) {
        var _this = this;
        this.storage.get("phone").then(function (num) {
            var uri = "https://us-central1-serious-cabinet-100514.cloudfunctions.net/StorageAPI-user?";
            var command = "command=getUserProducts&";
            var phone = "number=7342729836"; //num.substring(2,num.length)
            var url = uri + command + phone;
            console.log("sent: " + url);
            _this.http.get(url).map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log("got back:", JSON.stringify(data));
                _this.listItems = data;
                _this.storage.set('products', data);
                loading.dismiss();
            }, function (error) {
                console.log("error", JSON.stringify(error));
            });
        });
    };
    HomePage.prototype.clear = function () {
        this.storage.set('products', undefined);
    };
    HomePage.prototype.goToProd = function (params) {
        if (!params)
            params = {};
        else
            params = { item: params };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edit_item_edit_item__["a" /* EditItemPage */], params);
    };
    HomePage.prototype.goToAdd = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__add_add__["a" /* AddPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/christianmunte/CIS-375-App/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Home\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-fab right bottom>\n    <button ion-fab mini on-click="goToAdd()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n  <ion-card *ngFor="let item of listItems">\n    <ion-list>\n      <ion-item-sliding>\n        <ion-item color="none">\n          {{ item.name }}\n          <button ion-button clear item-right icon-only (click)="goToProd(item)"><ion-icon name="more"></ion-icon></button>\n        </ion-item>\n        <ion-item-options side="left">\n          <button ion-button color="light"></button>\n        </ion-item-options>\n      </ion-item-sliding>\n      <div>\n          <img [src]="item.image" />\n      </div>\n      <ion-item>\n        <div class="show-list-numbers-and-dots">\n          <p style="margin-top:0px;color:#000000;">\n            {{ item.desc }}\n          </p>\n          <p style="color:#000000;" (click)="clear()">\n              Current Price:\n              <strong>\n                {{ item.price }}\n              </strong>\n              Rating:\n              <strong>\n                  {{ item.rating }}/5.0\n              </strong>\n          </p>\n        </div>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/christianmunte/CIS-375-App/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular___["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[330]);
//# sourceMappingURL=main.js.map