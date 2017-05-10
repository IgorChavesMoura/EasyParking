import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

//Modulo da pagina de registro que declara e exporta a classe da pagina para o modulo principal
@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterModule {}
