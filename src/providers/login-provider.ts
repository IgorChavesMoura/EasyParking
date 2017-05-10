import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from '../models/usuario';
import { Credential } from '../models/credential';
import firebase from "firebase";
//Provider responsavel pelos metodos de login, e pela comunicação com a api do firebase
@Injectable()
export class LoginProvider {

  currentUser:any;
  autenticado:boolean;
  loginSuccessEventEmitter:EventEmitter<any>;
  loginFailEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone) {
    this.loginSuccessEventEmitter = new EventEmitter(); //Emissor do evento de login com sucesso
    this.loginFailEventEmitter = new EventEmitter(); //Emissor do evento de erro em uma tentativa de login
    this.logoutEventEmitter = new EventEmitter(); //Emissor de evento de logout
    firebase.auth().onAuthStateChanged(user => {
      this.callbackStateChange(user); //Trata a mudança de estado de um usuario
    })
  }
  registerUser(credential: Credential){
    firebase.auth().createUserWithEmailAndPassword(credential.email,credential.password) //Metodo para criar um usuario, usando uma credencial
            .then(result => console.log(result)) 
            .catch(error => console.log(error));
  }
  loginWithCredential(credential:Credential){
    firebase.auth().signInWithEmailAndPassword(credential.email,credential.password) //Metodo de login padrao com email e senha
    .then(result => this.callbackLoginSuccess(result)) 
    .catch(error => this.callbackLoginFail(error));
  }
  loginWithGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider(); //Metodo de login com o google
    firebase.auth().signInWithPopup(provider)
    .then(result => this.callbackLoginSuccess(result))
    .catch(error => this.callbackLoginFail(error));

  }
  loginWithFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider(); //Metodo de login com o facebook

    firebase.auth().signInWithPopup(provider)
    .then(result => this.callbackLoginSuccess(result))
    .catch(error => this.callbackLoginFail(error));
  }
  private callbackStateChange(user){
    this.ngZone.run( () => {
      if(user == null){               //Magia negra, favor nao tentar entender no momento
        this.currentUser = null;
        this.autenticado = false;
      } else {
        this.currentUser = user;
        this.autenticado = true;
      }
    });
  }
  private callbackLoginSuccess(response){
    this.loginSuccessEventEmitter.emit(response); //Callback para o caso de sucesso no login, manda o emissor de sucesso no login emitir o evento mandando os dados do usuario logado
  }
  private callbackLoginFail(error){
    this.loginFailEventEmitter.emit({code:error.code, message:error.message, email:error.email, credential:error.credential});//Callback para erro no login, manda o emissor de erro emitir o evento mandando os dados do erro 
  }
}