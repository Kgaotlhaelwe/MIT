import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, Tabs,ModalController,ViewController } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


import { Contacts } from '@ionic-native/contacts';
import * as moment from 'moment';
import { AboutPage } from '../about/about';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { EventPage } from '../event/event';

import { ToastController } from 'ionic-angular';
import { ModalmessagePage } from '../modalmessage/modalmessage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessagePage } from '../message/message';

/**
 * Generated class for the AutomatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-automate',
  templateUrl: 'automate.html',
})
export class AutomatePage {

@ViewChild('baseTabs') tabsRef : Tabs;
  phoneNumber ;
  peronalisedMsg
  autoMsgArray = this.navParams.get("autoMsgArray")

  message ;
  today

  date = new Date() ;
  countDownDate = this.navParams.get("countDownDate")

  chosenDate =this.navParams.get("chosenDate");
  chosenTime =this.navParams.get("chosenTime");
  name = this.navParams.get("name");
  categoryChosen = this.navParams.get("categoryChosen") ;

  tempArray = [];

  image ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController, private contacts: Contacts, private db:DatabaseProvider,public toastCtrl: ToastController,public modalCtrl: ModalController, public viewCtrl: ViewController ) {

  
  
  
  
  }

  ionViewDidLoad() {


    if (this.categoryChosen == "Weddings"){
      this.db.getWeddingMessage().then((data:any)=>{
        console.log(data);
        
        this.tempArray =(data) ;
        console.log(this.tempArray);
        
  
      })
  
    }else if (this. categoryChosen =="Birthday" ){
      this.db.getBirthdayMessages().then((data:any)=>{
        console.log(data);
        
        this.tempArray =data ;
        console.log(this.tempArray);
        
      })
  
  
    }else if (this. categoryChosen =="Graduations"){
      this.db.getGraduationMessages().then((data:any)=>{
        this.tempArray =data ;
  
      })
  
    }else if (this. categoryChosen =="Baby Shower"){
      this.db.getbabyShower().then((data:any)=>{
        this.tempArray =data ;
  
      })
  
    }else if (this. categoryChosen =="New Jobs"){
      this.db.getJobMessage().then((data:any)=>{
        this.tempArray = data ;
  
      })
  
  
    }else if (this. categoryChosen =="Anniversary"){
      this.db.getAnniversaryMessages().then((data:any)=>{
        this.tempArray =data ;
  
      })
  
    }else if (this. categoryChosen =="Thinking of you"){
      this.db.getThinkingofyou().then((data:any)=>{
        this.tempArray =data ;

      })
  
    } else {
      this.db.getGeneralMessage().then((data:any)=>{
        this.tempArray =data ;
  
      })
  
    }
    console.log('ionViewDidLoad AutomatePage');

    console.log(this.categoryChosen);

    
    if("Birthday" == this.categoryChosen){
      this.image ="../../assets/icon/icons8_Wedding_Cake_100px.png";
      console.log(this.image );
      
    }
    else if("Graduations"== this.categoryChosen ){
      this.image ="../../assets/icon/icons8_Graduation_Cap_100px.png" ;
      console.log(this.image );

    }else if("Baby Shower" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_Pram_100px.png";
      console.log(this.image );

    }
    else if("New Jobs" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
      console.log(this.image );

    }
    else if("Anniversary" == this.categoryChosen ){
      this.image ="../../assets/icon/icons8_Wedding_Gift_96px.png";
      console.log(this.image );

    }
    else if("Weddings" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
      console.log(this.image );

    }
    else if("Thinking of you" == this.categoryChosen ){
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
      console.log(this.image );

    }
    else if("General" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_People_100px.png";
      console.log(this.image );

    }
  }



  autoMessagessssss(message){

   console.log(message);

  
   
   let obj = {message:message}

   arry [0] = obj ;

  /// arry.push(obj)

   console.log(arry);

   this.navCtrl.popTo(MessagePage)

   

 
}
   


  


    
    back(){
      this.navCtrl.pop();
    }

  

  
}



var arry = [] ;

export default arry ;


