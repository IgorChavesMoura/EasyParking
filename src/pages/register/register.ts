import { LoginProvider } from '../../providers/login-provider';
import { Credential } from '../../models/credential';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

//Componente responsavel pelo codigo da pagina de registro
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  credential:Credential;

  constructor(public navCtrl: NavController, //Injeta dependencias
              public navParams: NavParams,
              public loginProvider: LoginProvider,
              public alertCtrl: AlertController ) {
                
              this.credential = new Credential();
  }

  ionViewDidLoad() {
    
  }
  registerUser(){
    this.loginProvider.registerUser(this.credential); //Chama o metodo de registrar do provider, usando a credencial do formulado preenchido no template
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
