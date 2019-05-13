import { Component } from '@angular/core';
import { NavController, NavParams, AlertController , ActionSheetController, ModalController } from 'ionic-angular';

declare var firebase
import {DatabaseProvider} from '../../providers/database/database';

import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


import * as moment from 'moment';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  dummyText: string = "type text";
  random= Math.floor(Math.random() * 6) + 0;
 bigSize = ["url",
                         "url('../../assets/ringbackground.jpg')",
                         "url('../../assets/flowerbackground.jpg')",
                         "url('../../assets/ballonbackground.jpg')",
                         "url('../../assets/backgroun11.jpg')",
                         "url('../../assets/background12.jpg')"];

  message =this.navParams.get("message");
  key ;
  msg ;
  name;
  image;
  userid;
  users;
  icon;
  obj;
  phoneNumber;
  dates;
  time = new Date();
    
  background= Math.floor(Math.random() * 4) + 0;
 







    constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts, public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,  private db:DatabaseProvider,public modalCtrl: ModalController , private network: Network , public toastCtrl: ToastController) {
      this.msg =this.message.message;
      this.name =this.message.name;
      this.image=this.message.image;
      this.key = this.message.id;
      console.log(this.message);
      console.log(this.key);
      
      this.users= firebase.auth().currentUser;
      this.userid=this.users.uid
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad ViewPage');
      console.log(this.message);
      this.randombg();
     
    }
    ionwillEnter(){
      this.randombg();

    }

   

    ngAfterViewInit() {
          let tabs = document.querySelectorAll('.show-tabbar');
          if (tabs !== null) {
              Object.keys(tabs).map((key) => {
                  tabs[key].style.display = 'none';
              });
          }
        }
      
        ionViewWillLeave() {
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'flex';
            });
          }
        }

        reviewChange(){
          document.getElementById("hidebtn").style.display="block" ;

        }
 

        
        
      
       
          
          
          
        
      
      

        

       



  
        randombg(){

          document.getElementById("background").style.backgroundImage=this.bigSize[this.background];
          // document.getElementById("random").style.backgroundColor="red";
          // document.getElementById("random").style.backgroundImage="block"
 
        }   

      }
