import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, AlertController, Keyboard, ViewController } from 'ionic-angular';
import { AutomatePage } from '../automate/automate';
//import { PersonalizedPage } from '../personalized/personalized';
//import { AdminPage } from '../admin/admin';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';
import { EventPage } from '../event/event';
import *as moment from 'moment';



import { DatabaseProvider } from '../../providers/database/database';
import arry from '../automate/automate'
import { ModalmessagePage } from '../modalmessage/modalmessage';
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';

import { ToastController, LoadingController } from 'ionic-angular';
import { memory } from '@angular/core/src/render3/instructions';
import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';
import { Platform } from 'ionic-angular';

declare var firebase;

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  graduationMsg = this.navParams.get("graduationMsg");


  weddingMsg = this.navParams.get("weddingMsg");
  newJobMsg = this.navParams.get("newJobMsg");
  birthdayMsg = this.navParams.get("birthdayMsg");
  babyShowerMsg = this.navParams.get("babyShowerMsg");
  anniversaryMsg = this.navParams.get("anniversaryMsg");
  modalMessage = this.navParams.get("modalMessage");
  peronalisedMsg = this.navParams.get("peronalisedMsg");

  categoryChosen = this.navParams.get("categoryChosen");

  phoneNumber;
  name = this.navParams.get("name"); imagez: string;
  ;
  date = this.navParams.get("date");
  time = this.navParams.get("time");
  countDownDate;
  messageType;
  today;
  messagez;
  image;
  day;
  month;
  myDate;
  messageauto;
  mybirthDate;
  messageArry = arry;
  messagezz;
  // name1 =this.navParams.get("name1"); ;
  date1;


  personalisedMessage: boolean = false;
  autoMessage: boolean = false;
  automsg;
  saveMessage;
  showName;
  selectedDetails = this.navParams.get("selectedDetails");

  temptime;
  tempdate

  textboxmessage;

  userName;
  schedulefunction;
  userDate = 'select a date';
  fullDate;
  updateDate;


  grads = [{ message: "You can achieve whatever you want in life. All you have to do is believe that you can. We believe in you, happy graduation day." },
  { message: "You are brilliant, able and ambitious. You shall always walk the glory road. Happy Graduation. I bless you with all that you need to earn many more achievements and feats in life ahead. Congratulations and well done." },
  { message: "Graduation isn’t the end of a tough journey. It is the beginning of a beautiful one" },
  { message: "Graduation is an exciting time. It marks both an ending and a beginning; it’s warm memories of the past and big dreams for the future." },
  { message: "Graduation wishes for lots and lots of fun and all it takes to make your day a very happy one! Congratulations, Graduate!" },
  { message: "Congratulations Graduate on this momentous day. You’ve worked hard to achieve your goals and now you’re on your way to seek new vistas, dream new dreams, embark on who you are, embrace life with passion and keep reaching for your star. Go for it!" }
  ]



  // wedding messsage 

  wed = [{ message: "I hope your life with your spouse will be filled with lasting happiness and joy. Congratulations on your big day" },
  { message: "Always treat your partner better than you want to be treated, may you have the happiest of marriages. Congratulations" },
  { message: "Congratulations on your wedding dude, so glad you convinced someone to marry you" },
  { message: "I can’t remember a time I’ve seen you this happy, I’m so glad you found true love. congratulations and happy married life" },
  { message: "May your wedding day turn out just as you planned and may you have the happiest of marriages. Happy married life" },
  { message: "May today be the beginning of a long, happy life together. May your home be blessed with blessings beyond your imagination. Congratulations." }
  ]


  // Anniversary 

  AnniversaryMessage = [{ message: "May your love grow like wildflowers, and happy anniversary to an amazing couple!" },
  { message: "A love like yours lasts! Happy Anniversary" },
  { message: "A couple anniversary messages to remember: Always treasure your partner and know the best is yet to come" },
  { message: "Your love, dedication, and commitment to one another is truly an inspiration to all of us kids. Congratulations on your years of marriage" },
  { message: "Wishing you more joy, laughter and happiness in the years to come. Happy Anniversary" },
  { message: "Your anniversary began with a promise. May that promise continue to strengthen with each passing year" },
  { message: "Count your anniversaries not by years alone, but by the great memories and happy times you’ve known" }
  ]

  //job message


  jobMessage = [{ message: "A new job is a new blessing so just keep up the good work and stay strong!" },
  { message: "I wish you all the best in this new job of yours, I hope that you will enjoy it" },
  { message: "The best part in a new job is the chance to finally get to do what you love to do" },
  { message: "Take the time you need to adjust to this new job of yours, it will be alright" },
  { message: "After all your struggles, you are here now, congratulations on landing this job!" },
  { message: "The secret to succeeding at a new job is to exceed and surpass the job description. Here's wishing you all the best." },
  { message: "May your new job  make you a billionaire so that we can party at your expense. Congrats." },
  { message: "You have worked so hard and deserve everything that is coming to you. Congratulations on the new job" }
  ]


  babyShowerMessage = [{ message: "Many best wishes for the remainder of your pregnancy and the birth of your little bundle of love" },
  { message: "Being a parent is the highest paid job in the world since the payment is in pure love. Congratulations to two of the best parents the world could ever hope for" },
  { message: "Parenthood is a wild ride full of love, laughter, questions, learning, excitement, craziness, hugs, kisses and so much more. Congrats on your tiny little teacher" },
  { message: "I’m so excited for the two of you to be parents. I wish nothing but happiness and success for you both" },
  { message: "A baby will make love stronger, days shorter, nights longer, bank balance smaller, home happier, clothes dirty, the past forgotten and the future worth living for. Congratulations." },
  { message: "Wishing all the best to you and your precious baby" },
  { message: "Sleep is overrated, babies are not! Especially your new bundle of love. Enjoy!" }

  ]

  birthdayMessage = [{ message: "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!" },
  { message: "A wish for you on your birthday, whatever you ask may you receive, whatever you seek may you find, whatever you wish may it be fulfilled on your birthday and always. Happy birthday!" },
  { message: "Another adventure filled year awaits you. Welcome it by celebrating your birthday with  splendor. Wishing you a very happy and fun-filled birthday!" },
  { message: "May the joy that you have spread in the past come back to you on this day. Wishing you a very happy birthday!" },
  { message: "This birthday, I wish you abundant happiness and love. May all your dreams turn into reality and may lady luck visit your home today. Happy birthday to one of the sweetest people I’ve ever known" },
  { message: "Your birthday is the first day of another 365-day journey. Be the shining thread in the beautiful tapestry of the world to make this year the best ever. Enjoy the ride." }



  ]

  thinkingofyouMessage = [{ message: "There is one good thing about not seeing you… I can think of you!" },
  { message: "When you fall asleep every night, I can`t! Thoughts about you don`t let me sleep!" },
  { message: "As old saying claims: we are what we are thinking about. As for me, I`m thinking of you. What about you?" },
  { message: "It doesn`t matter when we`re not together. Because I`m thinking of you, and this fact makes me closer to you!" },
  { message: "I hope once you`ll realize how hard it can be thinking of you!" },
  { message: "Don`t worry about all problems you have… Someone is thinking of you!" },
  { message: " If you love someone, you realize it when cannot stop thinking about this person…" }


  ]


  generalMesage = [{ message: "A man loves his sweetheart the most, his wife the best, but his mother the longest." },
  { message: "Your absence is creating a vacuum and we are missing you so much. You have always made a great difference in our lives when you were fit. Now you’re ill, we wish you speedy recovery and join our hands in prayer to proclaim you healing." },
  { message: "Get well soon lazy brother. Your absence has created more work than I can handle. The more you stay in the hospital, the more work I have to do. Anyway, get well very quickly and come home. I’m missing you." },
  { message: "I do not wish to consider why you are taking long to recover; no, you are not been nursed there. To be frank, I think I’m missing you badly, wishing you speedy recovery, for I can’t wait any longer. Get well soondear." },
  { message: "There are several reasons your family is worried and needs you at home, and one of it is that you are so wonderful and we just need you back here. Get well soon. We love you." },
  { message: "As the beauty and gifts of yuletide fades to usher a New Year, may your new beginnings be renewed with good tidings, happiness, hope and peace." },
  { message: "A new year is a fresh start for realization of dreams, may the beginning of this year fill you with new strength, bravery and faith necessary to achieve your dreams. Happy New Year." },
  { message: "Wishing you the best during this joyful season. I hope your holidays are filled with festivities and plenty of merry enjoyment." },



  ]

  userCategory;
  hideDate;
  showDate;
  userdate;
  showUpdateBtn;
  showSendBtn;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private socialSharing: SocialSharing, private contacts: Contacts, public modalCtrl: ModalController,   private db: DatabaseProvider,  private network: Network, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private keyboard: Keyboard, private viewCtrl: ViewController ,platform: Platform) {
    this.time = moment(new Date()).format()


    this.hideDate = true;
    this.showUpdateBtn = false;
    this.showSendBtn = true;

    this.tempdate = moment(new Date()).format()

    console.log(this.selectedDetails);



    console.log(this.selectedDetails);

    var users = firebase.auth().currentUser;
    firebase.database().ref("user/" + users.uid).on('value', (data: any) => {
      var profile = data.val();

      console.log(profile);
      this.userName = profile.name

      console.log(this.userName);




    })

    if (this.selectedDetails.categoryChosen == "Birthday") {
      this.showDate = true;
      this.hideDate = false;

    }
    console.log(this.selectedDetails);


    this.db.getScheduledFunctionEmails().then((data: any) => {
      this.schedulefunction = data;

    })
    let backAction =  platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    },2)

  
  



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





    var users = firebase.auth().currentUser;
    firebase.database().ref("user/" + users.uid).on('value', (data: any) => {
      var profile = data.val();

      console.log(profile);
      this.userName = profile.name

      console.log(this.userName);




    })

  }

  ionViewDidEnter() {

    if (this.messageArry.length == 1) {
      this.textboxmessage = this.messageArry[0].message






    } else {



    }



  }

  ionViewDidLoad() {



    var users = firebase.auth().currentUser;
    firebase.database().ref("user/" + users.uid).on('value', (data: any) => {
      var profile = data.val();

      console.log(profile);
      this.userName = profile.name

      console.log(this.userName);
      this.userCategory = this.selectedDetails.categoryChosen;




      this.showName = this.selectedDetails.name;


    })


    if (this.selectedDetails.check == "birthday") {
      this.showSendBtn = true;
    }






    if (this.messageArry.length == 1) {
      this.textboxmessage = this.messageArry[0].message;



      this.messageArry.splice(0, 1)


    } else {

    }

    if (this.textboxmessage != undefined && this.selectedDetails.track == 1) {


      console.log("test1");


      this.showSendBtn = true
      this.textboxmessage = undefined;

      // this.showSendBtn =false ;
    } else if (this.selectedDetails.track == 1) {
      this.showSendBtn = true;
      console.log("test2");


    }

    else {

      if (this.selectedDetails.empty == 1) {
        console.log("innnnside");
        console.log("test3");


        this.showUpdateBtn = false;
        this.showSendBtn = true

      } else {
        this.showUpdateBtn = true;
        this.showSendBtn = false
        console.log("test4");

        console.log(this.selectedDetails.empty)

      }

      if (this.messageArry.length == 0) {
        this.textboxmessage = this.selectedDetails.message;



      }

      this.updateDate = this.selectedDetails.date
      this.userDate = this.selectedDetails.date;

      if (this.selectedDetails.categoryChosen == "Birthday") {
        this.imagez = "../../assets/imgs/icons8_Wedding_Gift_96px.png";
        this.image = "../../assets/icon/icons8_Wedding_Cake_100px.png";
        
        let cutdate = this.selectedDetails.date.substring(0, 2);
        let cutMonth = this.selectedDetails.date.substring(3, this.selectedDetails.date.length);
        if (cutdate == "02") {
          this.userDate = "FEB" + "/" + cutMonth
        } else if (cutdate == "01") {
          this.userDate = "JAN" + "/" + cutMonth
        }

        else if (cutdate == "03") {
          this.userDate = "MARCH" + "/" + cutMonth
          console.log("march");

        } else if (cutdate == "O4") {
          this.userDate = "APRIL" + "/" + cutMonth;
          console.log("april");

        } else if (cutdate == "05") {
          this.userDate = "MAY" + "/" + cutMonth
        } else if (cutdate == "06") {
          this.userDate = "JUNE" + "/" + cutMonth

        } else if (cutdate == "07") {
          this.userDate = "JULY" + "/" + cutMonth
        } else if (cutdate == "08") {
          this.userDate = "AUG" + "/" + cutMonth

        } else if (cutdate == "09") {
          this.userDate = "SEP" + "/" + cutMonth
        } else if (cutdate == "10") {
          this.userDate = "OCT" + "/" + cutMonth
        } else if (cutdate == "11") {
          this.userDate = "NOV" + "/" + cutMonth
        } else if (cutdate == "12") {
          this.userDate = "DEC" + "/" + cutMonth

        }

      }


    }




    if (this.messageType == 'a') {
      // this.navCtrl.push
      const modal = this.modalCtrl.create(AutomatePage, { graduation: this.graduationMsg, chosenDate: this.date, chosenTime: this.time, name: this.name, categoryChosen: this.categoryChosen, countDownDate: this.countDownDate });
      modal.present();

    }


    if ("Birthday" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Wedding_Cake_96px_1.png";
      console.log(this.imagez);

    }
    else if ("Graduations" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Graduation_Cap_96px.png";
      console.log(this.imagez);

    } else if ("Baby Shower" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Mother_96px.png";
      console.log("getimage");

      console.log(this.imagez);

    }
    else if ("New Jobs" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Briefcase_96px.png";
      console.log(this.imagez);

    }
    else if ("Anniversary" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Wedding_Gift_96px.png";
      console.log(this.imagez);

    }
    else if ("Weddings" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_Diamond_Ring_100px.png";
      console.log(this.imagez);

    }
    else if ("Thinking of you" == this.selectedDetails.categoryChosen) {
      this.imagez = " ../../assets/imgs/icons8_Collaboration_Female_Male_100px_1.png";
      console.log(this.imagez);

    }
    else if ("General" == this.selectedDetails.categoryChosen) {
      this.imagez = "../../assets/imgs/icons8_People_100px.png";
      console.log(this.imagez);

    } else {

    }


    if ("Birthday" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Wedding_Cake_100px.png";
      console.log(this.image);

    }
    else if ("Graduations" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Graduation_Cap_100px.png";
      console.log(this.image);

    } else if ("Baby Shower" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Pram_100px.png";
      console.log("getimage");

      console.log(this.image);

    }
    else if ("New Jobs" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
      console.log(this.image);

    }
    else if ("Anniversary" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Wedding_Gift_96px.png";
      console.log(this.image);

    }
    else if ("Weddings" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
      console.log(this.image);

    }
    else if ("Thinking of you" == this.selectedDetails.categoryChosen) {
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
      console.log(this.image);

    }
    else if ("General" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_People_100px.png";
      console.log(this.image);

    } else {

    }

  }






  autoMsg() {

    this.navCtrl.push(AutomatePage, { categoryChosen: this.selectedDetails.categoryChosen })

    // if (this.selectedDetails.categoryChosen == "Birthday") {
    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.birthdayMessage })

    // } else if (this.selectedDetails.categoryChosen == "Graduations") {
    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.grads });

    // }

    // else if (this.selectedDetails.categoryChosen == "Baby Shower") {
    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.babyShowerMessage })
    // } else if (this.selectedDetails.categoryChosen == "Weddings") {

    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.wed })
    // } else if ("New Jobs" == this.selectedDetails.categoryChosen) {
    //   console.log("in");

    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.jobMessage })
    // } else if ("Thinking of you" == this.selectedDetails.categoryChosen) {
    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.thinkingofyouMessage })
    // } else if ("General" == this.selectedDetails.categoryChosen) {
    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.generalMesage })

    // } else if ("Anniversary" == this.selectedDetails.categoryChosen) {
    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.AnniversaryMessage })

    // } else {

    //   this.navCtrl.push(AutomatePage, { autoMsgArray: this.generalMesage });
    // }

    //this.textboxmessage = undefined ;

  }


  send() {

    let full = this.month + this.day;
    var users = firebase.auth().currentUser;
    var userName;
    // console.log(this.image);






    let today = new Date()
    let uniquedate = new Date().getTime();

    //console.log(this.selectedDetails.categoryChosen, this.myDate, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate, this.image, this.selectedDetails.name);


    console.log(today);

    console.log(this.userName);

    let currentday = moment(today).format('YYYY-MM-DD');
    console.log(currentday);
    
    let scheduledetail = moment(this.selectedDetails.date).format('YYYY-MM-DD');

                                                              


    if (this.selectedDetails.categoryChosen == "Birthday") {

      this.myDate = full;
      console.log(this.myDate);
      

      console.log(this.myDate);
      console.log( this.image);
                                                                                                               


      if (this.textboxmessage != undefined && this.month != undefined) {



        this.db.scheduleEmails(this.selectedDetails.categoryChosen, this.myDate, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate, this.image, this.selectedDetails.name).then(() => {
          this.db.scheduleEmailForFunction(this.selectedDetails.categoryChosen, this.myDate, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate)
          
          this.navCtrl.push(ModalmessagePage).then(() => {
            const index = this.viewCtrl.index-1;
            // then we remove it from the navigation stack
            this.navCtrl.remove(index);

          });

        });


      } else {
        this.db.showAlert("", "Please Enter all Details")
      }





    } else {


      if (this.textboxmessage != undefined && this.myDate != undefined) {

        if (this.myDate > currentday) {
          this.db.scheduleEmails(this.selectedDetails.categoryChosen, this.myDate, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate, this.image, this.selectedDetails.name).then(() => {
            this.db.scheduleEmailForFunction(this.selectedDetails.categoryChosen, this.myDate, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate)
            
            this.navCtrl.push(ModalmessagePage).then(() => {
              const index = this.viewCtrl.index-1
             // let currentIndex = this.navCtrl.getActive().index;
              this.navCtrl.remove(index);
              //this.app.getRootNav().popToRoot();

            });
          });


        } else {
          this.db.showAlert("", "Please choose future days ")

        }




      }

      // else if (this.textboxmessage == undefined){
      //   this.db.showAlert("" , "Please write the message ")


      // }else if (this.textboxmessage == undefined){
      //   this.db.showAlert("" , "Please choose the date ")

      // }
      else {
        this.db.showAlert("", "Please Enter all Details ")

      }





    }



   



  }


  dateChange() {
    console.log(this.myDate);


    if (this.myDate == this.selectedDetails.date) {

    } else {
      this.showSendBtn = true;
      this.showUpdateBtn = false;
    }


    if (this.selectedDetails.categoryChosen == "Birthday") {
      this.showSendBtn = false;
      this.showUpdateBtn = true

    }

    if (this.selectedDetails.check == "birthday") {
      this.showSendBtn = true;
      this.showUpdateBtn = false

    }




  }


  dateChanged(a) {

    let z = "0";
    let x = "-";

    console.log(a)

    if (a.day <= 9) {
      let stringDate = a.day.toString();

      this.day = z + stringDate


    } else {
      let stringDate = a.day.toString();
      this.day = stringDate
    }

    if (a.month <= 9) {
      let stringDate = a.month.toString();

      this.month = z + stringDate + x;

    } else {
      let stringDate = a.month.toString();
      this.month = stringDate + x
    }

    this.fullDate = this.month + this.day;
    //console.log(this.selectedDetails.date);
    // console.log(this.fullDate);




    if (this.fullDate == this.selectedDetails.date) {

    } else {
      this.showSendBtn = true;
      this.showUpdateBtn = false;

      console.log("check0 ")
    }

    if (this.selectedDetails.categoryChosen == "Birthday") {
      if (this.selectedDetails.message == undefined) {
        this.showSendBtn = true;
        console.log("check1 ")

      } else {
        console.log("check4");
        this.showSendBtn = false
        this.showUpdateBtn = true

      }



    }

    if (this.selectedDetails.check == "birthday") {
      this.showSendBtn = true;
      this.showUpdateBtn = false

    }


  }



  update() {

    console.log(this.updateDate);
    console.log(this.fullDate);


    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
    let updatingtime;
    console.log(this.updateDate);

    console.log(this.userDate);
    console.log(this.myDate);


    if (this.myDate == undefined) {
      updatingtime = this.updateDate

    } else {
      updatingtime = this.myDate;

    }




    if (this.selectedDetails.categoryChosen == "Birthday") {
      if (this.fullDate == undefined) {
        updatingtime = this.updateDate

      } else {
        updatingtime = this.fullDate

      }

    }


    if (this.textboxmessage != undefined) {
      var users = firebase.auth().currentUser;
      var userid = users.uid;
      let tempdate;
      console.log(this.selectedDetails.key);
      console.log(this.selectedDetails.uniquedate);






      var update = {
        message: this.textboxmessage,
        date: updatingtime
      }

      firebase.database().ref('scheduledEmails/' + userid).child(this.selectedDetails.key).update(update).then(() => {
        for (let index = 0; index < this.schedulefunction.length; index++) {
          if (this.schedulefunction[index].uniquedate == this.selectedDetails.uniquedate) {
            firebase.database().ref("schedulefunctionEmail/").child(this.schedulefunction[index].k).update(update).then(() => {
              //this.navCtrl.push(AboutPage) ;
              this.navCtrl.parent.select(2);
              let currentIndex = this.navCtrl.getActive().index-1;
              this.navCtrl.remove(currentIndex, 2);
            });
          }


        }


      });
    } else {
      this.db.showAlert("", "Please write a message")
    }

  }
}

