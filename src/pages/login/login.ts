import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { Credential } from '../../models/credential';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loginProvider:LoginProvider,
              public alertCtrl: AlertController ) {

                this.credential = new Credential();              
  }

  ionViewDidLoad() {
      this.loginProvider.loginSuccessEventEmitter.subscribe(
        user => {console.log(user);this.showLoginAlert(user);}


      );
      this.loginProvider.loginFailEventEmitter.subscribe(
        error => console.log(error)
      );
  }
  loginWithCredential(){
    console.log(this.credential);
    this.loginProvider.loginWithCredential(this.credential);
  }
  loginWithGoogle(){
    this.loginProvider.loginWithGoogle();
  }
  loginWithFacebook(){
    this.loginProvider.loginWithFacebook();
  }
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }
  showLoginAlert(user){
    let alert = this.alertCtrl.create({
      title: user.email,
      subTitle:"Você está logado!",
      buttons: ['OK']
    });
    alert.present();
  }
}
