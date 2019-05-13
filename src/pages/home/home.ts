import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
//import { AutomatePage } from '../automate/automate';
//import { MessagePage } from '../message/message';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ActionSheetController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { Slides } from 'ionic-angular';
//import {
// StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent
//} from 'angular2-swing';
import { ToastController } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
//import { LoginPage } from '../login/login';
import { PersonalisedcardPage } from '../personalisedcard/personalisedcard';
import { Network } from '@ionic-native/network';
import { LoadingController } from 'ionic-angular';
//import { ImageLoader } from 'ionic-image-loader';
import { AlertController } from 'ionic-angular';
//import { DiconnectedPage } from '../diconnected/diconnected';
import { Platform } from 'ionic-angular';
//import { CustomisedCardPage } from '../customised-card/customised-card';

// 

//import { IonicImageLoader } from 'ionic-image-loader';
//import { ImgLoader } from 'ionic-image-loader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mesaagesArray = [];
  msgz = []
  indx = 0
  //@ViewChild('myswing1') swingStack: SwingStackComponent;
  //@ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  cards: Array<any>;
  //stackConfig: StackConfig;
  recentCard: string = '';
  currentIndex: number = 0;
  count = 0;
  liked = 0
  shareMsg
  imgstring: string;
  @ViewChild(Slides) slides: Slides;
  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: {
      backgroundColor: '#28e93b',
      indicator: "Liked"
    },
    dislike: {
      backgroundColor: '#e92828',
      indicator: "Disliked"
    }
  };
  images = [];
  slidingImage;
  textdisplay;
  imzx = [];
  hasMessages;
  noCards = 1

  url;

  imagesArray = []

  likedPic = []
  imzxx;

  hideimage;
  constructor(public navCtrl: NavController, private db: DatabaseProvider, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController, public popoverCtrl: PopoverController, private sanitizer: DomSanitizer, public toastCtrl: ToastController, private network: Network, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform) {
    this.hideimage = true;
    this.db.getMessages().then((data: any) => {
      console.log(data);
      this.images = data




      this.imzx = this.images[this.liked].message


      console.log(this.imzx);

      for (let i = 0; i < this.images.length - 2; i++) {

        this.attendants.push({
          id: i + 1,
          likeEvent: new EventEmitter(),
          destroyEvent: new EventEmitter(),
          asBg: sanitizer.bypassSecurityTrustStyle('url(' + this.images[i] + ')')
        });





      }
      this.ready = true;

    }, (error) => { })

    this.db.getFavouriteImages().then((data: any) => {
      console.log(data);
      this.likedPic = data;


    })

    platform.registerBackButtonAction(() => {
      console.log("backPressed 1");
      this.navCtrl.pop();
    }, 1);


  }





  // clearCache(refresher) {
  //   this.imageLoader.clearCache();
  //   refresher.complete();
  // }

  onImageLoad(event) {
    //console.log('image ready: ', event);
  }


  presentLoading() {

  }


  sum(x, y, z) {
    //return x + y + z;
  }
  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type
    this.toastCtrl.create({
      message: connectionState,
      duration: 3000,

      cssClass: 'toast1',
    }).present()

  }

  ionViewDidEnter() {

    this.platform.registerBackButtonAction(function () {
      this.navCtrl.pop()

    });

    this.network.onConnect().subscribe(data => {
      console.log(data)
      // this.displayNetworkUpdate('Connected')
      this.navCtrl.push(HomePage);
    }

      , error => console.error(error));

    this.network.onDisconnect().subscribe(data => {

      console.log(data)
      this.displayNetworkUpdate('Disconnected to the network, please try again')
      //this.navCtrl.push(DiconnectedPage);
    }, error => console.error(error));

  }
  onCardInteract(event) {


    if (event.like == false) {
      console.log(event.like);
      this.liked = this.liked + 1
      this.textdisplay = this.cardOverlay.dislike.indicator
      const toast = this.toastCtrl.create({
        message: this.textdisplay,
        cssClass: 'toast4',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      console.log(this.textdisplay);
      if (this.liked == this.images.length - 2) {

        this.hasMessages = "Oops! you ran out of cards ";
        document.getElementById("hidebtnz").style.display = "none";

      }
      this.imzx = this.images[this.liked].message
    }
    ////////////////////////////////////////////////////////////////////////////


    var track;

    if (event.like == true) {

      ////////////////////////////////////////////

      if (this.likedPic.length == 0) {

        this.db.likedMessage(this.imzx).then(() => { })
        this.textdisplay = this.cardOverlay.like.indicator
        const toast = this.toastCtrl.create({
          message: this.textdisplay,
          cssClass: 'toast',
          duration: 2000,
          position: 'top'
        });
        toast.present();


      } else if (this.likedPic.length >= 1) {


        for (let index = 0; index < this.likedPic.length; index++) {

          if (this.likedPic[index].message == this.imzx) {
            track = 1




            break;

          } else {
            track = 0

          }


        }


        if (track == 0) {
          this.db.likedMessage(this.imzx).then(() => { })
          this.textdisplay = this.cardOverlay.like.indicator
          const toast = this.toastCtrl.create({
            message: this.textdisplay,
            cssClass: 'toast',
            duration: 2000,
            position: 'top'
          });
          toast.present();

        } else {

          const toast = this.toastCtrl.create({
            message: "You already liked it ",
            cssClass: 'toast6',
            duration: 1000,
            position: 'top'
          });
          toast.present();


        }



        if (this.liked - 1 == this.images.length - 4) {
          this.noCards = 0

          this.hasMessages = "Oops! you ran out of cards ";
          document.getElementById("hidebtnz").style.display = "none";

        }

        this.liked = this.liked + 1
        this.imzx = this.images[this.liked].message

        console.log(this.liked);
        console.log(this.images.length);

 }


 }



}





  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  shareVia() {
    ///this.liked = this.liked + 1
    this.imzx = this.images[this.liked].message



    this.db.sendviaWhatsApps(this.imzx)
  }

  Personalcard() {
    console.log("personalised card");

    //this.navCtrl.push(CustomisedCardPage)
  }


  like() {



    var track;

    if (this.likedPic.length == 0) {

      this.db.likedMessage(this.imzx).then(() => { })
      this.textdisplay = this.cardOverlay.like.indicator
      const toast = this.toastCtrl.create({
        message: this.textdisplay,
        cssClass: 'toast',
        duration: 2000,
        position: 'top'
      });
      toast.present();


    } else if (this.likedPic.length >= 1) {


      for (let index = 0; index < this.likedPic.length; index++) {

        if (this.likedPic[index].message == this.imzx) {
          track = 1




          break;

        } else {
          track = 0

        }


      }


      if (track == 0) {
        this.db.likedMessage(this.imzx).then(() => { })
        this.textdisplay = this.cardOverlay.like.indicator
        const toast = this.toastCtrl.create({
          message: this.textdisplay,
          cssClass: 'toast',
          duration: 2000,
          position: 'top'
        });
        toast.present();

      } else {

        const toast = this.toastCtrl.create({
          message: "You already liked it ",
          cssClass: 'toast6',
          duration: 1000,
          position: 'top'
        });
        toast.present();


      }



      if (this.liked == this.images.length - 2) {

        document.getElementById("cards").style.display = "none";
        this.hasMessages = "Oops! you ran out of cards ";
        document.getElementById("hidebtnz").style.display = "none";

      } else { }

      this.liked = this.liked + 1
      this.imzx = this.images[this.liked].message


    }





  }


  dislike() {

    if (this.liked == this.images.length - 2) {

      document.getElementById("cards").style.display = "none"
      this.hasMessages = "Oops! you ran out of cards ";
      document.getElementById("hidebtnz").style.display = "none";

    } else {


      this.textdisplay = this.cardOverlay.dislike.indicator
      const toast = this.toastCtrl.create({
        message: this.textdisplay,
        cssClass: 'toast4',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      console.log(this.textdisplay);





      this.liked = this.liked + 1
      this.imzx = this.images[this.liked].message

      console.log(this.liked);
      console.log(this.images.length);

    }



    console.log(this.liked);
    console.log(this.images.length);




  }




  insertpic(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;

        this.imagesArray.push(this.url)
        console.log(this.imagesArray);








      };
      reader.readAsDataURL(event.target.files[0]);
      //console.log(event.target.files);
      let selectedfile = event.target.files[0];

    }

  }
}



