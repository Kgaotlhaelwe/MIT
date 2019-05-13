import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { user } from '../model/user'
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home'

import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';
declare var firebase

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as user;

  usrn = 0
  mail = 0
  pass = 0

  btn
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, private network: Network, public loadingCtrl: LoadingController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

    this.btn = <HTMLInputElement>document.getElementById('btRegister');
    this.btn.disabled = true;
  }





  Register(email, pass, name) {

    console.log(name);
    console.log(email);
    console.log(pass);

    const loader = this.loadingCtrl.create({
      content: "Please wait... still connecting ",
      cssClass: "loading-md .loading-wrapper ",
      duration: 3000

    });
    loader.present();

    if (email != "" && pass != "") {

     
      this.db.register(email, pass, name).then(() => {

   setTimeout(() => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            title: 'Registered Successfully',
            subTitle: 'Please check your email to verify ',
            buttons: [{
              text: 'OK',
              handler: data => {
                const loader = this.loadingCtrl.create({
                  content: "Loading...",
                  cssClass: "loading-md .loading-wrapper ",
                  duration: 3000

                });
                loader.present();

                this.navCtrl.push(LoginPage)

              }
            }]
          });
          alert.present();


        }, 3000)


        name = "";
        email = "";
        pass = "";

      }, (error) => {


        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();


      })
    } else {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please enter email and password',
        buttons: ['OK']
      });
      alert.present();
    }



  }



  getUserName(user) {

console.log(user, this.mail, this.pass);

    if (user == "" && this.mail == 1 && this.pass == 1) {
      this.btn.disabled = true;
      this.usrn = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (user == "" && this.mail == 0 && this.pass == 1) {
      this.usrn = 0
      console.log("disabled = true");
      this.btn.disabled = true;
      console.log(this.mail);
    } else if (user == "" && this.mail == 1 && this.pass == 0) {
      this.usrn = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (user != "" && this.mail == 1 && this.pass == 1) {
      this.usrn = 1
      console.log("disabled = false");
      this.btn.disabled = false;
      console.log(this.mail);
    } else if (user != "" && this.mail == 1 && this.pass == 0) {
      this.usrn = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (user != "" && this.mail == 0 && this.pass == 1) {
      this.usrn = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (user != "" && this.mail == 0 && this.pass == 0) {
      this.usrn = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else {
      console.log("disabled = true @ else email");
      this.btn.disabled = true;
    }






  }


  getEmail(email) {
    console.log(email, this.usrn, this.pass);
    
    if (email == "" && this.usrn == 1 && this.pass == 1) {
      this.btn.disabled = true;
      this.mail = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email == "" && this.usrn == 0 && this.pass == 1) {
      this.mail = 0
      console.log("disabled = true");
      this.btn.disabled = true;
      console.log(this.mail);
    } else if (email == "" && this.usrn == 1 && this.pass == 0) {
      this.mail = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email != "" && this.usrn == 1 && this.pass == 1) {
      this.mail = 1
      console.log("disabled = false");
      this.btn.disabled = false;
      console.log(this.mail);
    } else if (email != "" && this.usrn == 1 && this.pass == 0) {
      this.mail = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email != "" && this.usrn == 0 && this.pass == 1) {
      this.mail = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (email != "" && this.usrn == 0 && this.pass == 0) {
      this.mail = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else {
      console.log("disabled = true @ else email");
      this.btn.disabled = true;
    }





  }

  getPassword(password) {
console.log(password, this.usrn, this.mail);

    if (password == "" && this.usrn == 1 && this.mail == 1) {
      this.btn.disabled = true;
      this.pass = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (password == "" && this.usrn == 0 && this.mail == 1) {
      this.pass = 0
      console.log("disabled = true");
      this.btn.disabled = true;
      console.log(this.mail);
    } else if (password == "" && this.usrn == 1 && this.mail == 0) {
      this.pass = 0
      console.log("disabled = true");
      console.log(this.mail);
    } else if (password != "" && this.usrn == 1 && this.mail == 1) {
      this.pass = 1
      console.log("disabled = false");
      this.btn.disabled = false;
      console.log(this.mail);
    } else if (password != "" && this.usrn == 1 && this.mail == 0) {
      this.pass = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (password != "" && this.usrn == 0 && this.pass == 1) {
      this.pass = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else if (password != "" && this.usrn == 0 && this.mail == 0) {
      this.pass = 1
      this.btn.disabled = true;
      console.log("disabled = true");
      console.log(this.mail);
    } else {
      console.log("disabled = true @ else email");
      this.btn.disabled = true;
    }






  }



  google() {
    this.db.SignWithGoogle()

  }
  LoginPage() {
    this.navCtrl.push(LoginPage)
  }

}
