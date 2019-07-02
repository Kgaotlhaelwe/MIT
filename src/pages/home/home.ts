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

import {CardPage} from "../card/card" ;

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
  hidebtnCard :boolean =false;

  day = new Date();
  datetoSting = this.day.toString();
  res = this.datetoSting.substring(0, 3);
  str = this.res;
  imagetemArray = [];
  imz;
  constructor(public navCtrl: NavController, private db: DatabaseProvider, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController, public popoverCtrl: PopoverController, private sanitizer: DomSanitizer, public toastCtrl: ToastController, private network: Network, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform) {

    console.log(this.res)
    this.hideimage = true;
    this.db.getImages().then((data: any) => {
      console.log(data);
      this.imagetemArray = data;
      // this.images =data
      console.log(this.imagetemArray)

      for (let index = 0; index < this.imagetemArray.length; index++) {
        console.log(this.str);
        console.log(this.imagetemArray[index].day)

        if (this.str == this.imagetemArray[index].day) {
          console.log("in the loop image")
          console.log(this.imagetemArray[index])
          this.images.push(this.imagetemArray[index])

        } else {
          console.log("not in loop image");
          console.log(this.str);

        }

      }




      console.log(this.images);

      this.imzx = this.images[this.liked].message


      console.log(this.imzx);

      for (let i = 0; i < this.images.length; i++) {

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
    if (this.images.length != this.liked) {
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
        if (this.liked == this.images.length) {

          this.hasMessages = "Oops! you ran out of cards ";
          document.getElementById("hidebtnz").style.display = "none";
          this.hidebtnCard = true


        } else {
          this.imzx = this.images[this.liked].message
        }

      }


      //////////////////////////////////////////////////

      var track;

      if (event.like == true) {
        if (this.likedPic.length == 0) {
          console.log(this.likedPic)
          this.db.likedMessage(this.imzx).then(() => {
            this.textdisplay = this.cardOverlay.like.indicator
            this.liked = this.liked + 1
            const toast = this.toastCtrl.create({
              message: this.textdisplay,
              cssClass: 'toast',
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }).catch((error) => {

          })

        } else {

          for (let index = 0; index < this.likedPic.length; index++) {
            if (this.likedPic[index].message == this.imzx) {
              track = 1
              break;
            } else {
              track = 0
            }
          }

          if (track == 0) {
            this.db.likedMessage(this.imzx).then(() => {
              this.liked = this.liked + 1
              this.textdisplay = this.cardOverlay.like.indicator
              const toast = this.toastCtrl.create({
                message: this.textdisplay,
                cssClass: 'toast',
                duration: 2000,
                position: 'top'
              });
              toast.present();
            })
          } else {
            this.liked = this.liked + 1
            const toast = this.toastCtrl.create({
              message: "You already liked it ",
              cssClass: 'toast6',
              duration: 1000,
              position: 'top'
            });
            toast.present();
          }

          if (this.liked == this.images.length) {
            this.hasMessages = "Oops! you ran out of cards ";
            document.getElementById("hidebtnz").style.display = "none";
            this.hidebtnCard = true

          } else {
            this.imzx = this.images[this.liked].message
          }
          console.log(this.liked);
          console.log(this.images.length);
        }
      }

    } else {
      console.log(" hide image ")
      this.hasMessages = "Oops! you ran out of cards ";
      document.getElementById("hidebtnz").style.display = "none";
    }


    ////////////////////////////////////////////////////////////////////////////





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
    var track ;

    console.log("clicked like button")
    if (this.likedPic.length == 0) {
      console.log(this.likedPic)
      this.db.likedMessage(this.imzx).then(() => {
        this.textdisplay = this.cardOverlay.like.indicator
        this.liked = this.liked + 1
        const toast = this.toastCtrl.create({
          message: this.textdisplay,
          cssClass: 'toast',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }).catch((error) => {

      })

    } else {

      for (let index = 0; index < this.likedPic.length; index++) {
        if (this.likedPic[index].message == this.imzx) {
          track = 1
          break;
        } else {
          track = 0
        }
      }

      if (track == 0) {
        this.db.likedMessage(this.imzx).then(() => {
          this.liked = this.liked + 1
          this.textdisplay = this.cardOverlay.like.indicator
          const toast = this.toastCtrl.create({
            message: this.textdisplay,
            cssClass: 'toast',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        })
      } else {
        this.liked = this.liked + 1
        const toast = this.toastCtrl.create({
          message: "You already liked it ",
          cssClass: 'toast6',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }

      if (this.liked == this.images.length) {

        
     console.log("hide iamge and buttons")
        this.hasMessages = "Oops! you ran out of cards ";
        document.getElementById("cards").style.display = "none";
        document.getElementById("hidebtnz").style.display = "none";
        this.hidebtnCard = true

      } else {
        this.imzx = this.images[this.liked].message
      }
      console.log(this.liked);
      console.log(this.images.length);
    }




  }


  dislike() {

    
      
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
      if (this.liked == this.images.length) {

       
        document.getElementById("hidebtnz").style.display = "none";
        document.getElementById("cards").style.display = "none";
        this.hasMessages = "Oops! you ran out of cards ";
        this.hidebtnCard = true
       
        console.log("hide everything ")


      } else {
        this.imzx = this.images[this.liked].message
      }

    




  }


  takeMeToCardPage(){
    this.navCtrl.push(CardPage) ;
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



