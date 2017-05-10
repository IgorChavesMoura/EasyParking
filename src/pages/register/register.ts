import { LoginProvider } from '../../providers/login-provider';
import { Credential } from '../../models/credential';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  credential:Credential;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loginProvider: LoginProvider,
              public alertCtrl: AlertController ) {
                
              this.credential = new Credential();
  }

  ionViewDidLoad() {
    
  }
  registerUser(){
    this.loginProvider.registerUser(this.credential);
    this.showAlert();
    this.navCtrl.push(LoginPage);
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }
}
