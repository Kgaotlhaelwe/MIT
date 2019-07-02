import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';


import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
//import { LoginPage } from '../../pages/login/login';
import { BehaviorSubject } from 'rxjs/Rx';


import { Events } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

declare var firebase;

/*
  Generated class for the DatabaseProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  message;
  graduationArray = [];
  weddingArray = [];
  birthdayArray = [];
  anniversaryArray = [];
  babyShowerArray = [];
  newJobArray = [];
  provider = new firebase.auth.GoogleAuthProvider();
  userID;

  likedArray = [];

  messageArray = [];
  condition;
  tempTheme: string;
  customizedCardarray = []
  contactListArray = []


  private theme: BehaviorSubject<String>;//declare

  weddingMessageArray = [];

  birthdayMessageArray = [];

  babyShowerMessageArray = [];
  graduation = []
  anniversary = [];
  newJob = [];
  general = [];
  thinkingofyou = [];
  constructor(public http: HttpClient, private socialSharing: SocialSharing, private networks: Network, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public events: Events, private ngZone: NgZone, public alertCtrl: AlertController) {
    // console.log('Hello DatabaseProvider Provider');
    // storage.get('theme').then((val) => {
    //   console.log('Your theme', val);
    //   this.tempTheme = val
    //   console.log(this.tempTheme);

    // });
    //this.theme = new BehaviorSubject(this.tempTheme);



  }

  // setAciveTheme(value) {
  //   this.storage.set('theme', value);
  //   this.theme.next(value);
  // }
  // getActiveTheme() {

  //   return this.theme.asObservable();
  // }

  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {

        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            // alert('user signed in')
            this.condition = 1
            this.userID = user.uid
            this.events.publish('user:created', this.userID, Date.now());
            console.log("got this from events", this.userID);

          } else {

            this.condition = 0
            // alert('no user signed in')
          }
          resolve(this.condition)
        })

      })


    })
  }

  register(email, password, name, ) {






    return new Promise((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("user/" + uid).set({
          name: name,
          email: email,
          proPicture: "../../assets/icon/download.png"
        })


        var user = firebase.auth().currentUser;

       resolve();

      }, (error) => {
        reject(error);
      });





    })





  }


  getUser() {


    return new Promise((resolve, reject) => {

      this.ngZone.run(() => {

        firebase.database().ref("user/" + this.userID).on('value', (data: any) => {
          var profile = data.val();

          console.log(profile);
          var obj = {
            name: profile.name,
            email: profile.email,
            profileimage: profile.proPicture

          }

          resolve(obj)

        })


      })





    })




  }



  getUid() {
    return this.userID

  }


  updateProfileName(name) {

    return new Promise((resolve, reject) => {

      this.ngZone.run(() => {


        var update = {
          name: name


        }


        firebase.database().ref('user/' + this.userID).update(update).then(() => {



        });


      })




    })


  }

  login(email, password) {



    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
          console.log(data);

          resolve(data);
        }, Error => {
          reject(Error)
        })

      })
        ;


    })


  }


  loginx(email, password) {

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }




  forgetPassword(email) {

    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {

        resolve();
      }, (error) => {
        reject(error)

      })


    })

  }


  saveContactList(name, email, occassion) {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref('contactList/' + userid).push({
        name: name,
        email: email,

        occassion: occassion




      })

      resolve();

    })
  }


  getContactlist() {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("contactList/" + userid).on('value', (data: any) => {
        this.contactListArray = []
        var contactList = data.val();
        console.log(data.val());
        if (contactList != null) {



          var keys: any = Object.keys(contactList);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              k: k,
              name: contactList[k].name,
              email: contactList[k].email,
              date: contactList[k].date,

            }
            //this.likedArray = [];
            this.contactListArray.push(obj)

            resolve(this.contactListArray);


          }
        } else {
          //  alert("YOU DONT FAV MESSAGE") ;
        }


      })

    })
  }

  SignWithGoogle() {
    var users = firebase.auth().currentUser;
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    return firebase.auth().signInWithPopup(this.provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.


      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var res = result.user.displayName.split(" ")
      console.log(user);

      firebase.database().ref("user/" + users.uid).set({
        email: user.email,
        username: user.displayName,
        name: {
          first: res[0],
          middle: res[1],
          last: res[2]
        }
      })




    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.d
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });



  }






  deletePic(key) {
    return new Promise((resolve, reject) => {
      console.log(this.userID);

      firebase.database().ref('likedPictures/' + this.userID).child(key).remove();
    })

  }


  temporaryliked(message) {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref('category/' + 'General').push({


        message: message,

      })

      resolve();

    })
  }










  sendviaWhatsApp(message, url) {

    return new Promise((resolve, reject) => {
      this.socialSharing.share(message, null, null, url).then(() => {

        resolve()

      }, (error) => {
        reject(error)

      })


    })
  }

  saveReviewMessages(name, message, date, image) {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("ReviewMessage/" + userid).push({
        name: name,

        message: message,
        date: date,
        image: image

      })

      resolve();

    })

  }


  likedMessage(message) {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("likedPictures/" + userid).push({


        message: message,

      })

      resolve();

    })

  }


  sentMessage(message, name, date) {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("sentMessage/" + userid).push({


        message: message,
        date: date,
        name: name,


      })

      resolve();

    })

  }

  customizedCard(image) {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("customisedCard/" + userid).push({


        image: image,
      })

      resolve();

    })

  }

  day =new Date(); 
  datetoSting = this.day.toString();
  res = this.datetoSting.substring(0, 4).toString();

  getImages() {

    const loader = this.loadingCtrl.create({
      content: "Please wait... still connecting",
      cssClass: "loading-md .loading-wrapper ",
      //duration :30000

    });
    loader.present();

    return new Promise((resolve, reject) => {
      firebase.database().ref('category/' + 'Cards').on('value', (data: any) => {

        var message = data.val();
        console.log(data.val());

        var keys: any = Object.keys(message);

        console.log(keys);

        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          

          let obj = {
            k: k,
            message: message[k].message ,
            day:message[k].day

          }
          this.messageArray.push(obj)

          resolve(this.messageArray);
          loader.dismiss();
        }


      })

    })

  }

  sendviaWhatsApps(message) {

    return new Promise((resolve, reject) => {
      this.socialSharing.share(null, null, message, null)
      resolve()




    })
  }





  sendviaFacebook(message, url) {
    return new Promise((resolve, reject) => {
      this.socialSharing.shareVia(message, null, null)
      resolve(message)






    })


  }

  sendViaemail(message) {
    return new Promise((resolve, reject) => {
      this.socialSharing.share(message, null, null)
      resolve(message)




    })



  }

  shareYourfav(message) {
    return new Promise((resolve, reject) => {
      this.socialSharing.share(message)
      resolve(message)




    })



  }

  shareYourcut(message) {
    return new Promise((resolve, reject) => {
      this.socialSharing.share(null, null, message, null)
      resolve(message)




    })



  }

  uploadProfilePic() {
    return new Promise((resolve, reject) => {


    })

  }


  getFavouriteImages() {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("likedPictures/" + userid).on('value', (data: any) => {

        var message = data.val();
        console.log(data.val());
        if (message != null) {

          this.likedArray = []

          var keys: any = Object.keys(message);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              k: k,
              message: message[k].message

            }
            //this.likedArray = [];
            this.likedArray.push(obj)

            resolve(this.likedArray);


          }
        } else {
          //  alert("YOU DONT FAV MESSAGE") ;
        }


      })

    })







  }




  getReviewMessage() {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("ReviewMessage/" + userid).on('value', (data: any) => {

        var message = data.val();
        console.log(data.val());
        if (message != null) {
          this.likedArray = []


          var keys: any = Object.keys(message);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              k: k,
              message: message[k].message,
              date: message[k].date,
              image: message[k].image,
              name: message[k].name

            }
            this.likedArray.push(obj)

            resolve(this.likedArray);


          }
        } else {
          //  alert("YOU DONT FAV MESSAGE") ;
        }


      })

    })


  }


  testNumbers(x, y, z) {

    return x + y + z;


  }

  getsentMessage() {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("sentMessage/" + userid).on('value', (data: any) => {

        var message = data.val();
        console.log(data.val());
        if (message != null) {
          this.likedArray = [];
          var keys: any = Object.keys(message);

          //  console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: message[k].message,
              name: message[k].name,
              date: message[k].date

            }
            this.likedArray.push(obj)

            resolve(this.likedArray);


          }
        } else {
          //  alert("YOU DONT FAV MESSAGE") ;
        }


      })

    })

  }
  signout() {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      // An error happened.
    });
  }

  savetoSentMessage(message, a, name) {

    var users = firebase.auth().currentUser;
    var userid = users.uid
    return new Promise((resolve, reject) => {

      firebase.database().ref("savetoSentMessage/" + userid).push({


        message: message,

        date: a,
        name: name,


      })

      resolve();

    })

  }



  getCustomisedCard() {
    return new Promise((resolve, reject) => {

      var users = firebase.auth().currentUser;
      var userid = users.uid
      firebase.database().ref("customisedCard/" + userid).on('value',
        (data: any) => {
          var name = data.val();
          this.customizedCardarray = []
          if (name !== null) {
            var keys: any = Object.keys(name);
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i];
              let obj = {
                key: k,
                image: name[k].image,
              }

              this.customizedCardarray.push(obj);
              console.log(this.customizedCardarray);
              resolve(this.customizedCardarray)
            }
          } else {

          }


        })
    })
  }






  displayNetworkUpdate(connectionState: string) {
    let networkType = this.networks.type
    this.toastCtrl.create({
      message: `YOU ARE NOW` + connectionState + 'via' + networkType,
      duration: 3000,
    }).present()

  }

  network() {

    return new Promise((resolve, reject) => {

      this.networks.onConnect().subscribe(data => {
        console.log(data)
        this.displayNetworkUpdate(data.type)

      }

        , error => console.error(error));

      this.networks.onDisconnect().subscribe(data => {

        console.log(data)
        this.displayNetworkUpdate(data.type)
      }, error => console.error(error));
      resolve();

    })
  }


  // reviewMessage



































  scheduleEmails(occassion, date, emailto, message, namefrom, uniquedate, image, name) {
    var users = firebase.auth().currentUser;
    var uid = users.uid
    var userEmail = users.email;
    return new Promise((resolve, reject) => {
      firebase.database().ref("scheduledEmails/" + uid).push({
        email: userEmail,
        date: date,
        emailto: emailto,
        occassion: occassion,
        message: message,
        namefrom: namefrom,
        uniquedate: uniquedate,
        image: image,
        name: name
      })

      resolve();

    })

  }

  scheduleEmailForFunction(occassion, date, emailto, message, namefrom, uniquedate) {
    var users = firebase.auth().currentUser;
    var userEmail = users.email;
    return new Promise((resolve, reject) => {
      firebase.database().ref("schedulefunctionEmail/").push({
        email: userEmail,
        date: date,
        emailto: emailto,
        occassion: occassion,
        message: message,
        namefrom: namefrom,
        uniquedate: uniquedate
      })

      resolve();

    })

  }



  getScheduledEmails() {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("scheduledEmails/" + userid).on('value', (data: any) => {

        var contactList = data.val();
        console.log(data.val());
        if (contactList != null) {

          this.contactListArray = []

          var keys: any = Object.keys(contactList);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              k: k,
              emailto: contactList[k].emailto,

              occassion: contactList[k].occassion,
              message: contactList[k].message,
              uniquedate: contactList[k].uniquedate,
              image: contactList[k].image,
              name: contactList[k].name,
              date: contactList[k].date

            }
            //this.likedArray = [];
            this.contactListArray.push(obj)

            resolve(this.contactListArray);


          }
        } else {
          //  alert("YOU DONT FAV MESSAGE") ;
        }


      })

    })

  }




  getScheduledFunctionEmails() {
    var users = firebase.auth().currentUser;
    var userid = users.uid

    return new Promise((resolve, reject) => {
      firebase.database().ref("schedulefunctionEmail/").on('value', (data: any) => {

        var contactList = data.val();
        console.log(data.val());
        if (contactList != null) {

          this.contactListArray = []

          var keys: any = Object.keys(contactList);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              k: k,
              uniquedate: contactList[k].uniquedate,



            }
            //this.likedArray = [];
            this.contactListArray.push(obj)

            resolve(this.contactListArray);


          }
        } else {
          //  alert("YOU DONT FAV MESSAGE") ;
        }


      })

    })

  }

  getFavourite() {
    return new Promise((resolve, reject) => {

      var user = firebase.auth().currentUser;
      var uid = user.uid;


      firebase.database().ref("likedPictures/" + uid).on('value', (data: any) => {

        var contactList = data.val();
        console.log(data.val());
        if (contactList != null) {

          this.likedArray = []

          var keys: any = Object.keys(contactList);

          console.log(keys);

          for (var i = 0; i < keys.length - 2; i++) {
            var k = keys[i];

            let obj = {
              k: k,

              message: contactList[k].message,



            }

            this.likedArray.push(obj);
            console.log(this.likedArray);


            resolve(this.likedArray);


          }
        } else {

        }


      })


    })


  }

  errorAlert(message) {

  }

  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      cssClass: "myAlert",
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  getWeddingMessage() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("category/Wedding").on('value', (data: any) => {

        var weddingMessages = data.val();
        console.log(data.val());
        if (weddingMessages != null) {

          this.weddingMessageArray = []

          var keys: any = Object.keys(weddingMessages);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: weddingMessages[k].message,
              occasion: weddingMessages[k].occasion
            }

            this.weddingMessageArray.push(obj)

            resolve(this.weddingMessageArray);


          }
        } else {

        }


      })

    })
  }


  getBirthdayMessages() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("category/Birthday").on('value', (data: any) => {

        var birthdayMessage = data.val();
        console.log(data.val());
        if (birthdayMessage != null) {

          this.birthdayMessageArray = []

          var keys: any = Object.keys(birthdayMessage);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: birthdayMessage[k].message,
              occasion: birthdayMessage[k].occasion
            }

            this.birthdayMessageArray.push(obj)

            resolve(this.birthdayMessageArray);


          }
        } else {

        }


      })

    })
  }

  getbabyShower() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("category/Baby shower").on('value', (data: any) => {

        var babyShower = data.val();
        console.log(data.val());
        if (babyShower != null) {

          this.babyShowerMessageArray = []

          var keys: any = Object.keys(babyShower);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: babyShower[k].message,
              occasion: babyShower[k].occasion
            }

            this.babyShowerMessageArray.push(obj)

            resolve(this.babyShowerMessageArray);


          }
        } else {

        }


      })

    })
  }

  getThinkingofyou() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("category/Thinking of you").on('value', (data: any) => {

        var thinkingofyou = data.val();
        console.log(data.val());
        if (thinkingofyou != null) {

          this.thinkingofyou = []

          var keys: any = Object.keys(thinkingofyou);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: thinkingofyou[k].message,
              occasion: thinkingofyou[k].occasion
            }

            this.thinkingofyou.push(obj)

            resolve(this.thinkingofyou);


          }
        } else {

        }


      })

    })

  }


  getAnniversaryMessages() {

    return new Promise((resolve, reject) => {
      firebase.database().ref("category/Anniversary").on('value', (data: any) => {

        var Anniversary = data.val();
        console.log(data.val());
        if (Anniversary != null) {

          this.anniversary = []

          var keys: any = Object.keys(Anniversary);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: Anniversary[k].message,
              occasion: Anniversary[k].occasion
            }

            this.anniversary.push(obj)

            resolve(this.anniversary);


          }
        } else {

        }


      })

    })

  }


  getGraduationMessages() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("category/Graduation").on('value', (data: any) => {

        var Graduation = data.val();
        console.log(data.val());
        if (Graduation != null) {

          this.birthdayMessageArray = []

          var keys: any = Object.keys(Graduation);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: Graduation[k].message,
              occasion: Graduation[k].occasion
            }

            this.graduation.push(obj)

            resolve(this.graduation);


          }
        } else {

        }


      })

    })

  }

  getJobMessage() {

    return new Promise((resolve, reject) => {
      firebase.database().ref("category/New-JOb").on('value', (data: any) => {

        var newJob = data.val();
        console.log(data.val());
        if (newJob != null) {

          this.birthdayMessageArray = []

          var keys: any = Object.keys(newJob);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: newJob[k].message,
              occasion: newJob[k].occasion
            }

            this.newJob.push(obj)

            resolve(this.newJob);


          }
        } else {

        }


      })

    })

  }


  getGeneralMessage() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("category/General").on('value', (data: any) => {

        var General = data.val();
        console.log(data.val());
        if (General != null) {

          this.birthdayMessageArray = []

          var keys: any = Object.keys(General);

          console.log(keys);

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            let obj = {
              key: k,
              message: General[k].message,
              occasion: General[k].occasion
            }

            this.general.push(obj)

            resolve(this.general);


          }
        } else {

        }


      })

    })

  }

}