import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { EventPage } from '../event/event';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EventPage;
  tab3Root = ProfilePage;
  tab4Root = AboutPage;
  //tab5Root = ContactPage;
  

  constructor() {

  }
}