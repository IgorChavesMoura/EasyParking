import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from '../models/usuario';
import { Credential } from '../models/credential';
import firebase from "firebase";
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  currentUser:any;
  autenticado:boolean;
  loginSuccessEventEmitter:EventEmitter<any>;
  loginFailEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone) {
    this.loginSuccessEventEmitter = new EventEmitter();
    this.loginFailEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();
    firebase.auth().onAuthStateChanged(user => {
      this.callbackStateChange(user);
    })
  }
  registerUser(credential: Credential){
    firebase.auth().createUserWithEmailAndPassword(credential.email,credential.password)
            .then(result => console.log(result))
            .catch(error => console.log(error));
  }
  loginWithCredential(credential:Credential){
    firebase.auth().signInWithEmailAndPassword(credential.email,credential.password)
    .then(result => this.callbackLoginSuccess(result))
    .catch(error => this.callbackLoginFail(error));
  }
  loginWithGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => this.callbackLoginSuccess(result))
    .catch(error => this.callbackLoginFail(error));

  }
  loginWithFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => this.callbackLoginSuccess(result))
    .catch(error => this.callbackLoginFail(error));
  }
  private callbackStateChange(user){
    this.ngZone.run( () => {
      if(user == null){
        this.currentUser = null;
        this.autenticado = false;
      } else {
        this.currentUser = user;
        this.autenticado = true;
      }
    });
  }
  private callbackLoginSuccess(response){
    this.loginSuccessEventEmitter.emit(response);
  }
  private callbackLoginFail(error){
    this.loginFailEventEmitter.emit({code:error.code, message:error.message, email:error.email, credential:error.credential});
  }
}