import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginModule } from '../pages/login/login.module';
import { RegisterModule } from '../pages/register/register.module';
import { LoginProvider } from '../providers/login-provider';
import firebase from "firebase";
const  firebaseConfig = {
    apiKey: "AIzaSyCfNkUhTQ2b0GfIN-IAvu845WOMfKw5ELk",
    authDomain: "listador-de-tarefas-1dcc5.firebaseapp.com",
    databaseURL: "https://listador-de-tarefas-1dcc5.firebaseio.com",
    storageBucket: "listador-de-tarefas-1dcc5.appspot.com",
    messagingSenderId: "430688120112"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginModule,
    HttpModule,
    RegisterModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
