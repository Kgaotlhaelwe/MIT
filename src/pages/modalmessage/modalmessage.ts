import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, IonicApp } from 'ionic-angular';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ModalmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
    selector: 'page-modalmessage',
    templateUrl: 'modalmessage.html',
})
export class ModalmessagePage {

    showbtn;

    constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, public viewCtrl: ViewController, public ionicApp: IonicApp, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalmessagePage' +
            this.navCtrl.length());
        this.ionViewWillLeave()
    }


    poptoevent() {


        this.showbtn = true;
        document.getElementById("hidebtn").style.display = "none"


    }


    ionViewWillEnter() {
        this.ngAfterViewInit()
    }


    viewScheduled() {
      this.navCtrl.parent.select(2);
       // this.navCtrl.push(AboutPage)
       
     
        // then we remove it from the navigation stack
       let currentIndex = this.navCtrl.getActive().index
       
        let previousIndex = this.navCtrl.getActive().index-1
        let prContact =  this.navCtrl.getActive().index-2
        this.navCtrl.remove(currentIndex);
        this.navCtrl.remove(previousIndex) ;
        this.navCtrl.remove(prContact) ;


        //this.navCtrl.setRoot(AboutPage, {tabs:"4"}) ;

        // let currentIndex = this.navCtrl.getActive().index;
        //       this.navCtrl.push(AboutPage).then(() => {
               // this.navCtrl.remove(currentIndex);
        //       });




    }

    CreateScheduled() {
        //   this.navCtrl.push(EventPage) ;
        // this.navCtrl.parent.select(2);
        //const index = this.viewCtrl.index;
        //   this.navCtrl.setRoot(ContactPage)
        // this.navCtrl.remove(1);


          this.navCtrl.setRoot(EventPage)
          const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
          this.navCtrl.remove(index);

      
    }

    ionViewWillLeave() {
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'none';
            });

        }

    }

    ngAfterViewInit() {
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'none';
            });
        }
    }
}