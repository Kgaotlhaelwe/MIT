import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, NavParams, ActionSheetController, ViewController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { InfosentPage } from '../infosent/infosent';
import { SplashPage } from '../splash/splash';
import { DatabaseProvider } from '../../providers/database/database';
import { AddContactsPage } from '../add-contacts/add-contacts';
import { MessagePage } from '../message/message';
import *as moment from 'moment';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Platform } from 'ionic-angular';


declare var firebase


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage   {
  categoryChosen = this.navParams.get("categoryChosen")

  date;
  contactListArray = [];
  contactDetails = {};
  msg = "Cannot create property '0' on number '0'";
  name2;
  scheduledmsg = [] ;
  tempArray = [] ;
  image ;
  imagez ;
  color = ["red" , "yellow", "blue"]
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public modalCtrl: ModalController, private db: DatabaseProvider, private contacts: Contacts, public actionSheetCtrl: ActionSheetController, private viewCtrl: ViewController, platform: Platform) {
   

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
          tabs[key].style.display = 'none';
      });
 
  }

  let backAction =  platform.registerBackButtonAction(() => {
    console.log("second");
    this.navCtrl.pop();
    backAction();
  },2)
  }


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactsPage');

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
    
    this.db.getContactlist().then((data: any) => {
      this.tempArray = data
     console.log( this.tempArray);

     // console.log(this.categoryChosen);

     for (let index = 0; index < this.tempArray.length; index++) {

      let shortname = this.tempArray[index].name.substring(1 , 0)
      console.log(shortname)
  
      let fullname = this.tempArray[index].name ;
      let email = this.tempArray[index].email ;
      let key =  this.tempArray[index].k
          
      
      let obj = {
        shortname:shortname,
        name:fullname ,
        email:email,
        key:key
      


          }

        this.contactListArray.push(obj) ;
        this.contactListArray.sort(this.dynamicSort("name"));

        console.log(this.contactListArray);
        
       
     }


     this.db.getScheduledEmails().then((data:any)=>{
          this.scheduledmsg = data ;

     })


    })


  }
  ionViewDidEnter(){

    if ("Birthday" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Wedding_Cake_96px_1.png";
      console.log(this.imagez);

    }
    else if ("Graduations" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Graduation_Cap_96px.png";
      console.log(this.imagez);

    } else if ("Baby Shower" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Mother_96px.png";
      console.log("getimage");

      console.log(this.imagez);

    }
    else if ("New Jobs" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Briefcase_96px.png";
      console.log(this.imagez);

    }
    else if ("Anniversary" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Wedding_Gift_96px.png";
      console.log(this.imagez);

    }
    else if ("Weddings" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Diamond_Ring_100px.png";
      console.log(this.imagez);

    }
    else if ("Thinking of you" == this.categoryChosen) {
      this.imagez = " ../../assets/imgs/icons8_Collaboration_Female_Male_100px_1.png";
      console.log(this.imagez);

    }
    else if ("General" == this.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_People_100px.png";
      console.log(this.imagez);

    } else {

      this.image = "../../assets/imgs/icons8_People_100px.png";
    }
   

    
   
  }

  pikColor(){
    for (let index = 0; index < this.contactListArray.length; index++) {
      let pickColor =this.color[Math.floor(Math.random() * this.color.length)] 
      console.log(pickColor)
   document.getElementById("colorshow").style.backgroundColor=pickColor ;
    
      
    }

  }
  choosecontact() {

    console.log(name);

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select contact  ',
      buttons: [
        {
          text: 'Phone contact',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.addcontactz();
          }
        }, {
          text: 'Add contact',
          handler: () => {

            console.log('Archive clicked');



          
            console.log(this.categoryChosen);


          
            this.navCtrl.push(AddContactsPage, { categoryChosen: this.categoryChosen }).then(() => {
              //const index = this.viewCtrl.index
             //this.navCtrl.remove(index);
            
            });
          }
        },
      ]
    });
    actionSheet.present();

  }


  userDetails() {
     this.navCtrl.push(AddContactsPage, { categoryChosen: this.categoryChosen });
   //let currentIndex = this.navCtrl.getActive().index;
   this.navCtrl.push(AddContactsPage, { categoryChosen: this.categoryChosen }).then(() => {
   ;// const index = this.viewCtrl.index
   // this.navCtrl.remove(index);
   });

    console.log("innnjn")
  }

  itemSelected(name, email, occassion) {
    console.log(this.categoryChosen);
    console.log( this.scheduledmsg);

    console.log( this.scheduledmsg.length);

var obj = {}

var track ;

    

    for (let index = 0; index < this.scheduledmsg.length; index++) {
            if(this.scheduledmsg[index].occassion == this.categoryChosen  && this.scheduledmsg[index].emailto == email){
             
              console.log("if statement");
              

              track  = 1
              

               obj = {
                message:this.scheduledmsg[index].message ,
                date:this.scheduledmsg[index].date ,
                categoryChosen:this.categoryChosen,
                email:email ,
                name:name,
                track:0,
                
                key:this.scheduledmsg[index].k,
                uniquedate:this.scheduledmsg[index]. uniquedate
              }
             
            break ;
              

            
            
            }else{
              console.log("else statement");
              
              track = 0 ;
             
              obj = {
                message:undefined,
                date:undefined ,
                email:email  ,
                name:name ,
                key:this.scheduledmsg[index].k,
                uniquedate:this.scheduledmsg[index]. uniquedate ,
                categoryChosen:this.categoryChosen ,
                track:1

              }
            //  this.navCtrl.push(MessagePage ,{ selectedDetails: obj} )
                console.log(obj);
                

            }



     
      
    }


    console.log(this.scheduledmsg.length);
    
    if(this.scheduledmsg.length == 0){
      console.log("insidedddddd");
      
      obj = {
        name:name ,
        email:email ,
        categoryChosen:this.categoryChosen ,
        empty:1 ,
        datex:"02-24" 
      }
    }

    if(track = 0){
      console.log(obj);
     this.navCtrl.push(MessagePage ,{ selectedDetails: obj} )
    //  let currentIndex = this.navCtrl.getActive().index;
    // this.navCtrl.remove(currentIndex);
   


    }else{
      console.log(obj);
     this.navCtrl.push(MessagePage ,{ selectedDetails: obj} )
   //  let currentIndex = this.navCtrl.getActive().index;
   //  this.navCtrl.remove(currentIndex);


    }



  }

  Delete(key , index){
    console.log(key);
    this.tempArray = [] ;
    
    
    


    const prompt = this.alertCtrl.create({
      title: 'Delete',
      message: " Are sure you want to delete this contact",
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
            var users = firebase.auth().currentUser ;
            var userid = users.uid ;
            if(this.contactListArray.length == 1){
              firebase.database().ref('contactList/'+ userid).child(key).remove().then(()=>{
                console.log("success");
                this.contactListArray = [] ;
              
                
                
              })
        
            }
            firebase.database().ref('contactList/'+ userid).child(key).remove().then(()=>{
              console.log("success");
             this.contactListArray.splice(index , 1)
              
              
            })
            console.log('Saved clicked');

          }
        }
      ]
    });
    prompt.present();

      
}


  addcontactz() {
    this.contacts.pickContact().then((data) => {
      console.log(data);
      console.log(data.name.formatted);
      this.name2 = data.name.formatted
      console.log(data.emails[0].value);

      let a = "Cannot read property '0' of null";




      if (data.emails[0].value === a) {
        console.log("in");


        this.contactDetails = {
          name: data.name.formatted,
          email: undefined,
          track: 1
        }
        //this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen })
       // let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen }).then(() => {
         // this.navCtrl.remove(currentIndex);
        });

      } else {

        this.contactDetails = {
          name: data.name.formatted,
          email: data.emails[0].value,
          track: 1
        }

        //this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen })
       // let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen }).then(() => {
          //his.navCtrl.remove(currentIndex);
        });
      }



    }).catch((error) => {
      console.log(error.message);

      this.contactDetails = {
        name: this.name2,
        email: undefined
      }
      //this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen })
     // let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen }).then(() => {
       // this.navCtrl.remove(currentIndex);
      });

    });




  }



   ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }



  // ionViewWillLeave() {
  //   let tabs = document.querySelectorAll('.show-tabbar');
  //   if (tabs !== null) {
  //       Object.keys(tabs).map((key) => {
  //           tabs[key].style.display = 'flex';
  //       });
   
  //   }
  // }

  
 
  // ionViewWillLeave() {
  // let tabs = document.querySelectorAll('.show-tabbar');
  // if (tabs !== null) {
  //     Object.keys(tabs).map((key) => {
  //         tabs[key].style.display = 'none';
  //     });
 
  // }
  // }

  // ngOnInit(){
  //   let tabs = document.querySelectorAll('.show-tabbar');
  //   if (tabs !== null) {
  //     Object.keys(tabs).map((key) => {
  //         tabs[key].style.display = 'none';
  //     });
 
  // }

  // }


   dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

}


