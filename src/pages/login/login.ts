import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { Credential } from '../../models/credential';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';


//Component da pagina de login, responsavel pelo codigo por tras do template da pagina

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController, //Aqui injetamos as dependencias que precisamos,
              public navParams: NavParams,   // assim podendo utilizar como atributos da nossa classe (sim, não ha necessidade de instanciar)
              public loginProvider:LoginProvider,
              public alertCtrl: AlertController ) {

                this.credential = new Credential();              
  }

  ionViewDidLoad() {  //Metodo que executa depois de a tela terminar de carregar 
      this.loginProvider.loginSuccessEventEmitter.subscribe(
        user => {console.log(user);this.showLoginAlert(user);} //Escuta o event emitter do provider para saber se um usuario logou com sucesso


      );
      this.loginProvider.loginFailEventEmitter.subscribe(
        error => console.log(error) // Escuta o event emitter do provider para saber se houve erro em uma tentativa de login
      );
  }
  loginWithCredential(){
    console.log(this.credential);
    this.loginProvider.loginWithCredential(this.credential); //Chama o metodo de login padrao do provider
  }
  loginWithGoogle(){
    this.loginProvider.loginWithGoogle(); //Chama o metodo de login com o google do provider
  }
  loginWithFacebook(){
    this.loginProvider.loginWithFacebook(); //Chama o metodo de login do facebook do provideer
  }
  goToRegister(){
    this.navCtrl.push(RegisterPage); //Manda o nav controller navegar para a pagina de registrar
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
