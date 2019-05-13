import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {PopoverPage} from '../pages/popover/popover' ;
import {LoginPage} from '../pages/login/login' ;
import {RegisterPage} from '../pages/register/register' ;
import {EventPage} from "../pages/event/event" ;
import {PersonalisedcardPage} from '../pages/personalisedcard/personalisedcard' ;
import {AddContactsPage} from "../pages/add-contacts/add-contacts"
import {MessagePage} from "../pages/message/message" ;
import { ModalmessagePage } from  "../pages/modalmessage/modalmessage" ;
import { AutomatePage} from "../pages/automate/automate" ;
import { TabsPage } from '../pages/tabs/tabs';
import {ProfilePage} from "../pages/profile/profile" ;
import {ViewPage} from "../pages/view/view" ;
import { InfosentPage} from "../pages/infosent/infosent" ;
import { SplashPage} from "../pages/splash/splash" ;
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import { DatabaseProvider } from '../providers/database/database';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
//SplashPage
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,PopoverPage ,
    TabsPage  ,PersonalisedcardPage,LoginPage,RegisterPage , ProfilePage , EventPage, MessagePage, AddContactsPage, ViewPage, InfosentPage , SplashPage, ModalmessagePage, AutomatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SwipeCardsModule , HttpClientModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage , PopoverPage , PersonalisedcardPage , LoginPage ,RegisterPage, ProfilePage, EventPage, MessagePage, AddContactsPage, ViewPage, InfosentPage, SplashPage , ModalmessagePage, AutomatePage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider , SocialSharing ,  Network ,  Camera ,  Contacts
  ]
})
export class AppModule {}
