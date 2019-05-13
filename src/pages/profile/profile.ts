import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, Keyboard } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverPage } from '../popover/popover';
import { DatabaseProvider } from '../../providers/database/database';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
//import { AngularCropperjsComponent } from 'angular-cropperjs';
// import { Keyboard } from '@ionic-native/keyboard';
declare var firebase;

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name;
  email;
  image
  userid;
  favouriteArray = [];
  customizedCard = [];
  pet;
  key;
  users;
  url;
  showinput: boolean;
  hide: boolean;
  updatename;

  profileimage;
  mypic;


  //@ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;
  myprofilepic: boolean;
  mycropmagez: boolean;
  showbtn: boolean;
  showuploadbtn: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private camera: Camera, public popoverCtrl: PopoverController, private db: DatabaseProvider, private network: Network, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private keyboard: Keyboard) {
    

    this.pet = "Favourites";

    this.users = firebase.auth().currentUser;

    firebase.database().ref("user/" + this.users.uid).on('value', (data: any) => {
      var profile = data.val();

      console.log(profile);
      this.name = profile.name
      this.email = profile.email;
      this.profileimage = profile.proPicture;
    })


  }

  save() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }

    var update = {
      name: this.updatename
    }


    return firebase.database().ref('user/' + this.users.uid).update(update).then(() => {
      this.showinput = false;
      document.getElementById("btnhide").style.display = "block"
      document.getElementById("namehide").style.display = "block"
    });





  }


  edit() {
    // this.keyboard.show();
    this.showinput = true;
    document.getElementById("btnhide").style.display = "none"
    document.getElementById("namehide").style.display = "none"
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }


  ShareD(image, key) {
    console.log(key);

    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      subTitle: "Would you like to share or delete the picture",
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            console.log('Cancel clicked');

            firebase.database().ref('customisedCard/' + this.users.uid).child(key).remove();
            this.navCtrl.push(ProfilePage);
          }
        },
        {
          text: 'Share',
          handler: data => {
            console.log('Saved clicked');
            this.db.shareYourcut(image)


          }
        }
      ]
    });
    prompt.present();
  }

  ShareDelete(a, key) {

    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      subTitle: " Would you like to share or delete the picture  ",
      buttons: [
        {
          text: 'Delete',
          handler: data => {

            //this.db.deletelikedImages(key).then(()=>{})
            console.log(key);

            firebase.database().ref('likedPictures/' + this.users.uid).child(key).remove();

            this.navCtrl.push(ProfilePage);
          }
        },
        {
          text: 'Share',
          handler: data => {
            console.log('Saved clicked');
            this.db.sendviaWhatsApps(a)


          }
        }
      ]
    });
    prompt.present();
  }












  ionViewDidEnter() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(' ProfilePage');


    this.db.getCustomisedCard().then((data: any) => {
      console.log(data);

      this.customizedCard = data;

      console.log(this.customizedCard);


    })


    this.db.getFavouriteImages().then((data: any) => {
      console.log(data);
      // this.favouriteArray = [] ;
      this.favouriteArray = data
    })




  }







  presentPopover(myEvent) {
    console.log("mm");
    
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }


  uploadImage() {


    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,

      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
     
      this.mypic = 'data:image/jpeg;base64,' + imageData;
     
      
      let userID = firebase.auth().currentUser.uid;
      firebase.database().ref("user/" + userID).update({
        proPicture: this.mypic,

      })





    }, (err) => {
      console.log(err);

    });





  }
  tabcheck() {


  }




  

}