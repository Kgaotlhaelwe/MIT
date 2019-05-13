import { Component } from '@angular/core';
import { Platform , Events,Keyboard, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { TabsPage } from '../pages/tabs/tabs';
import {RegisterPage} from '../pages/register/register';
import {LoginPage} from '../pages/login/login';
//import {AdminPage} from '../pages/admin/admin'
import {HomePage} from '../pages/home/home'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { EventPage } from '../pages/event/event';
//import { SplashPage } from '../pages/splash/splash';
import { timer } from 'rxjs/observable/timer'
//import { MessagePage } from '../pages/message/message';
//import { ImageLoaderConfig } from 'ionic-image-loader';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any  ;

  showSplash=true;
  selectedTheme

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  db:DatabaseProvider, public events: Events,private keyboard: Keyboard, app: App ) {
 

platform.ready().then(() => {
    platform.registerBackButtonAction(() => {
        app.navPop();
    });
})     

  events.subscribe('user:created', (user, time) => {
    var id = user

    
    console.log('Welcome', user, 'at', time);
  });
    db.checkstate().then((data:any)=>{
      console.log();
      

      if (data ==1){
        this.rootPage = TabsPage;
     
      }
      else {
        this.rootPage = LoginPage;
      }
     })
    platform.ready().then(() => {
     
      // this.imageLoaderConfig.enableDebugMode();
      // this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      // this.imageLoaderConfig.setFallbackUrl('assets/imgs/logo.png');
      // this.imageLoaderConfig.setMaximumCacheAge(24 * 60 * 60 * 1000);
 
      statusBar.styleDefault();
      splashScreen.hide();
       timer(3000).subscribe(()=> this.showSplash = false )


       
    });

    platform.runBackButtonAction

  //   this.keyboard.onKeyboardShow().subscribe(() => {
  //     document.body.classList.add('keyboard-is-open');
  // });

  // this.keyboard.onKeyboardHide().subscribe(() => {
  //     document.body.classList.remove('keyboard-is-open');
  // });
  }


  
}
