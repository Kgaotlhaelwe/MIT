import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';


import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';

import * as moment from 'moment';
declare var firebase
import { DatabaseProvider } from '../../providers/database/database';
//import { InfoPage } from '../info/info';
import { ViewPage } from '../view/view';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  sentMessages = new Array();
  phoneNumber;
  peronalisedMsg
  message;
  image;
  dates;
  icon;
  users;
  time = new Date();

  name = this.navParams.get('name');
  automessage = this.navParams.get('automessage');
  date = this.navParams.get("date");
  // countDownDate = this.navParams.get('countDownDate') ;     
  chosenCategory = this.navParams.get("chosenCategory");
  hasMessages: boolean = false;

  obj

  schedulefunction = [] ;
  tabs ;

  randomColor = Math.floor(Math.random()*16777215).toString(16);
asdf = '#' + this.randomColor

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private db: DatabaseProvider, public modalCtrl: ModalController, private network: Network, public toastCtrl: ToastController, platform: Platform) {
   
    
console.log(this.asdf);

  

    this.tabs = this.navParams.get('tabs');

   this.db.getScheduledEmails().then((data:any)=>{
     console.log(data);
     this.sentMessages = data
     console.log( this.sentMessages);

         if(this.sentMessages.length > 0){
        this.hasMessages = true;
      }
    

   })


   this.db.getScheduledFunctionEmails().then((data:any)=>{
     this.schedulefunction =data ;

   })


   let backAction =  platform.registerBackButtonAction(() => {
    console.log("second");
    this.navCtrl.pop();
    backAction();
  },2)

  }

  ionViewDidLoad() {

    
    this.db.getScheduledEmails().then((data:any)=>{
      console.log(data);
      this.sentMessages = data
      console.log( this.sentMessages);
 
          if(this.sentMessages.length > 0){
         this.hasMessages = true;
       }
     
    })

 
 
    this.db.getScheduledFunctionEmails().then((data:any)=>{
      this.schedulefunction =data ;
 
    })



    console.log(this.date);
    console.log(this.chosenCategory);
    // console.log(this.countDownDate);
    if ("Birthday" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Wedding_Cake_100px.png";
    }
    else if ("Graduation" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Graduation_Cap_100px.png";
    } else if ("Baby Shower" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Pram_100px.png";
    }
    else if ("New Job" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
    }
    else if ("Anniversary" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Wedding_Gift_96px.png";
    }
    else if ("Weddings" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
    }
    else if ("Thinking of you" == this.chosenCategory) {
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
    }
    else if ("General" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_People_100px.png";
    }




    this.db.getScheduledEmails().then((data:any)=>{
      console.log(data);
      this.sentMessages = [] ;
      this.sentMessages = data
      console.log( this.sentMessages);
      
      if(this.sentMessages.length > 0){
        this.hasMessages = true;
      }
    })

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }

  }

  

  ionViewWillEnter() {
    console.log(this.icon);
    console.log(this.automessage);
    this.dates = moment(this.time).format('MMM Do YYYY,');
    console.log(this.dates);
    this.sentMessages = [];
    this.users = firebase.auth().currentUser;

 this.db.getScheduledEmails().then((data:any)=>{
     console.log(data);
     this.sentMessages = data
     console.log( this.sentMessages);

         if(this.sentMessages.length > 0){
        this.hasMessages = true;
      }
    

   })


   this.db.getScheduledFunctionEmails().then((data:any)=>{
     this.schedulefunction =data ;

   })


   let tabs = document.querySelectorAll('.show-tabbar');
   if (tabs !== null) {
       Object.keys(tabs).map((key) => {
           tabs[key].style.display = 'flex';
       });
  
   }

    

  }


 ionViewDidEnter(){
  this.db.getScheduledEmails().then((data:any)=>{
    console.log(data);
    this.sentMessages = data
    console.log( this.sentMessages);

        if(this.sentMessages.length > 0){
       this.hasMessages = true;
     }
   

  })


  this.db.getScheduledFunctionEmails().then((data:any)=>{
    this.schedulefunction =data ;

  })
 }


  Delete(key, uniquedate) {

    



    const prompt = this.alertCtrl.create({
      title: 'Delete',
      message: " Are sure you want to delete this schedule message ",
      cssClass: "myAlert",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {

            console.log(key);
    

    var users = firebase.auth().currentUser ;
    var userid = users.uid ;
    console.log( users);
    console.log( userid);
    console.log(this,this.schedulefunction)
    
    if(this.sentMessages.length == 1){
      firebase.database().ref('scheduledEmails/'+ userid).child(key).remove().then(()=>{
        for (let index = 0; index < this.schedulefunction.length; index++) {
          if(this.schedulefunction[index].uniquedate ==uniquedate){
            firebase.database().ref("schedulefunctionEmail/").child(this.schedulefunction[index].k).remove() ;
          }
        
          
        }

      });
      console.log("in");
      
      this.sentMessages = [] ;

      this.ionViewDidLoad() ;

    } else {
      firebase.database().ref('scheduledEmails/'+ userid).child(key).remove().then(()=>{
        for (let index = 0; index < this.schedulefunction.length; index++) {
          if(this.schedulefunction[index].uniquedate ==uniquedate){
            firebase.database().ref("schedulefunctionEmail/").child(this.schedulefunction[index].k).remove() ;
          }
        
          
        }

      });

      this.ionViewDidLoad() ;


    }
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();

   
    


  }


  
  readMore(msg, name) {

    let obj = {
      message: msg,
      name:name
    }
    this.navCtrl.push(ViewPage, { message: obj })

  }
  

 


  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
        });
    }
  }

}
  
 

 

  







