import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Platform, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('chatBotTip') elem: ElementRef;
  @ViewChild(Nav) nav;
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private app: App,
    private renderer: Renderer2
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // if(this.platform.is('android')) {
      statusBar.styleLightContent();
      // }
      splashScreen.hide();
      // Tip: style
      if (this.elem && this.elem.nativeElement) {
        this.renderer.removeClass(this.elem.nativeElement, 'hidden');
        this.renderer.addClass(this.elem.nativeElement, 'open');
        setTimeout(() => {
          this.renderer.addClass(this.elem.nativeElement, 'hidden');
        }, 2500);
      }
      // Tip: end style
    });
  }

  goToChatRoom() {
    this.app.getRootNav().push('ChatRoomPage');
  }

  isShowChat() {
    if (this.nav.getActive()) {
      console.log(this.nav.getActive().id);
      switch (this.nav.getActive().id) {
        case 'ChatRoomPage':
          return false;
        default:
          return true;
      }
    } else {
      return false;
    }
  }
}

