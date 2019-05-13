import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalisedcardPage } from './personalisedcard';

@NgModule({
  declarations: [
    PersonalisedcardPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalisedcardPage),
  ],
})
export class PersonalisedcardPageModule {}
