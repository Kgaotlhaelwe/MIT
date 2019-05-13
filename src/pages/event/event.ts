import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
//import { AutomatePage } from '../automate/automate';
import { MessagePage } from '../message/message';

import { ActionSheetController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
//import { ModalmessagePage } from '../modalmessage/modalmessage';
//import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  mesaagesArray = [];
  msgz = []

  indx = 1

  // graduation messages




  // wedding messsage 



  // Anniversary 



  //job message











  generalMesage = [{ message: "A man loves his sweetheart the most, his wife the best, but his mother the longest." },
  { message: "Your absence is creating a vacuum and we are missing you so much. You have always made a great difference in our lives when you were fit. Now you’re ill, we wish you speedy recovery and join our hands in prayer to proclaim you healing." },
  { message: "Get well soon lazy brother. Your absence has created more work than I can handle. The more you stay in the hospital, the more work I have to do. Anyway, get well very quickly and come home. I’m missing you." },
  { message: "I do not wish to consider why you are taking long to recover; no, you are not been nursed there. To be frank, I think I’m missing you badly, wishing you speedy recovery, for I can’t wait any longer. Get well soondear." },
  { message: "There are several reasons your family is worried and needs you at home, and one of it is that you are so wonderful and we just need you back here. Get well soon. We love you." },
  { message: "As the beauty and gifts of yuletide fades to usher a New Year, may your new beginnings be renewed with good tidings, happiness, hope and peace." },
  { message: "A new year is a fresh start for realization of dreams, may the beginning of this year fill you with new strength, bravery and faith necessary to achieve your dreams. Happy New Year." },
  { message: "Wishing you the best during this joyful season. I hope your holidays are filled with festivities and plenty of merry enjoyment." },



  ]








  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, public popoverCtrl: PopoverController,  public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController,  public toastCtrl: ToastController) {
    this.db.getMessages().then((data: any) => {
      this.mesaagesArray = data

      console.log(this.mesaagesArray);

      this.msgz = this.mesaagesArray[0].message;

     // this.navCtrl.push(EventPage)





    }, (error) => { })
  }

  ionViewDidLoad() {
    

    console.log('ionViewDidLoad EventPage');

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }
    // ;

  }


    graduation(a) {
      
      
      this.navCtrl.push(ContactPage, { categoryChosen: a }).then(()=>{
       // let currentIndex = this.navCtrl.getActive().index
       // this.navCtrl.remove(currentIndex) ;
        
      
        
      });
      

    }


    wedding(a) {


      this.navCtrl.push(ContactPage, { categoryChosen: a })
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });


    }
    anniversary(a) {


      this.navCtrl.push(ContactPage, { categoryChosen: a });
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });

    }
    newJob(a) {

      this.navCtrl.push(ContactPage, { categoryChosen: a });
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });

    }
    babyShower(a) {


      this.navCtrl.push(ContactPage, { categoryChosen: a });
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });

    }
    birthday(a) {




      this.navCtrl.push(ContactPage, { categoryChosen: a });
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });

    }
    thinkingofyou(a) {


      this.navCtrl.push(ContactPage, { categoryChosen: a });
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });


    }

    other(a) {



      this.navCtrl.push(ContactPage, { categoryChosen: a });
      // let currentIndex = this.navCtrl.getActive().index;
      // this.navCtrl.push(ContactPage, { categoryChosen: a }).then(() => {
      //   this.navCtrl.remove(currentIndex);
      // });


    }

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
        ev: myEvent
      });
    }




    ngAfterViewInit() {
      let tabs = document.querySelectorAll('.show-tabbar');
      if (tabs !== null) {
          Object.keys(tabs).map((key) => {
              tabs[key].style.display = 'flex';
          });
      }
    }



    ionViewWillEnter() {
      let tabs = document.querySelectorAll('.show-tabbar');
      if (tabs !== null) {
          Object.keys(tabs).map((key) => {
              tabs[key].style.display = 'flex';
          });
     
      }
    }


  }
