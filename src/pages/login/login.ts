import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App, LoadingController, Keyboard } from 'ionic-angular';
import {user} from '../model/user';
import {DatabaseProvider} from '../../providers/database/database' ;
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
//import { MessagePage } from '../message/message';
//import { EventPage } from '../event/event';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

declare var firebase
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  show = {}
  user = {} as user ;

  constructor(public navCtrl: NavController, public navParams: NavParams , private keyboard: Keyboard, private db:DatabaseProvider ,public alertCtrl: AlertController,public loadingCtrl: LoadingController, private network: Network, public toastCtrl: ToastController) {

  


  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    var bt =  <HTMLInputElement>document.getElementById('btSubmit');
    bt.disabled=true ;
  }

  
     

  getEmail(email){
    console.log(email);
    var bt =  <HTMLInputElement>document.getElementById('btSubmit');
    if(email != ""){
    
      bt.disabled = false;



    }else{
      bt.disabled=true ;
     
      

    }
    

  }

  getPassword(pass){

    console.log(pass);
    var bt =  <HTMLInputElement>document.getElementById('btSubmit');
    if(pass != ""){
    
      bt.disabled = false;


    }else{
      bt.disabled=true ;

    }


  }

Login(email , password){
   var bt =  <HTMLInputElement>document.getElementById('btSubmit');

   const loader = this.loadingCtrl.create({
    content: "Processing...",
    cssClass: "loading-md .loading-wrapper ",
    duration :3000
  
  });
  loader.present();

    if(email != '' && password != ''){

      this.db.loginx(email , password).then((data)=>{
        if(data.user.emailVerified == true){
         

                  setTimeout(() => {
                  
                  
                           this.navCtrl.setRoot(TabsPage);
                         }, 1000);

        }else{
        
          this.db.showAlert("Email Verication" ,"Please Verify your Email")
                  
               

        }
      }).catch((error)=>{
       
          
      this.db.showAlert("" ,error.message) ;
      
      
          })
     
    }else{
      
     bt.disabled = true;
     
    }
    

   
   
     

  }

  forgetPassword() {
    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      title: 'Forget Password',
      //message: "Enter your Email....",
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter your Email....'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'RESET',
          handler: data => {

            console.log('Saved clicked');
            const loader = this.loadingCtrl.create({
              content: "Please wait...",
              duration: 2000
            });
            loader.present();

            console.log(data.name);

            if(data.name != ''){
              console.log("in");
              

              var em: string = data.name
              console.log(em.indexOf(' '));
              if (em.indexOf(' ') == -1) {
                this.db.forgetPassword(data.name).then(() => {
  
                  const alert2 = this.alertCtrl.create({
                    cssClass: "myAlert",
                    subTitle: "We have sent you email to recover password, Please check your Email",
                    buttons: ['OK']
                  });
                  alert2.present();
                }).catch((error) => {
                  //alert(error.message)
  
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    subTitle: error.message,
                    buttons: ['OK']
                  });
                  alert.present();
  
  
                })
              } else {
                var emailLength = em.length
                console.log(emailLength);
                var constructedEmail = em.substring(0, emailLength - 1)
                console.log(em.substring(0, emailLength - 1));
                this.db.forgetPassword(constructedEmail).then(() => {
  
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    subTitle: "We have sent you email to recover password, Please check your Email",
                    buttons: ['OK']
                  });
                  alert.present();
                })
              }

            }else {
              this.db.showAlert(" " ,"Please enter your email")
              
            }
            
        


          }
        }
      ]
    });
    prompt.present();
  }






  tabs(){
    this.navCtrl.push(TabsPage)
  }

 




  register(){
    this.navCtrl.push(RegisterPage);
  }

  
}