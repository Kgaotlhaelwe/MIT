import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
import { LoginPage } from '../login/login';


/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  
})
export class PopoverPage {

  selectedTheme: String;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, private db:DatabaseProvider,public alertCtrl: AlertController) {
    //  this.db.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
    
  }
  signout(){
    this.db.signout();
    const confirm = this.alertCtrl.create({
      cssClass: "myAlert",
      title: 'Log out',
      message: 'Do you want log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
    this.viewCtrl.dismiss();
  }
 
  changeTheme = function(){
    // this.db.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.db.getActiveTheme().subscribe((val)=>{
      this.selectedTheme = val
     })
    if(this.selectedTheme == 'maincolor-theme'){
      this.db.setAciveTheme('blue-theme');
      
    }else if(this.selectedTheme == 'blue-theme'){
      this.db.setAciveTheme('orange-theme');
     
    }else if(this.selectedTheme == 'orange-theme'){
      this.db.setAciveTheme('purple-theme');
      
    }else {
      this.db.setAciveTheme('maincolor-theme');
      
    }
  }

}
