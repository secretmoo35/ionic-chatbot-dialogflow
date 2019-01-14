import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  @ViewChild(Content) content: Content;
  @ViewChild('myChat') myChat: ElementRef;
  accessToken: string = '5a2288047714475da53216e5f245966d';
  messages: Array<Message> = [];
  message: string = '';
  dialogflow;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dialogflow = new ApiAiClient({
      accessToken: this.accessToken
    });
    this.dialogflow.agentName = "Dialogflow"
    this.dialogflow.agentImage = "http://www.realityhackertoolkit.com/wp-content/uploads/2017/04/Avatar.png";
    this.onTextRequestDialogflow('Welcome to dialogflow');
  }

  ionViewDidLoad() {
  }

  resize() {
    setTimeout(() => {
      this.myChat.nativeElement.style.height = '0px';
      this.myChat.nativeElement.style.height = this.myChat.nativeElement.scrollHeight + 'px';
    }, 0);
  }

  sendText() {
    if (!this.message || this.message === '') {
      return;
    }

    this.messages.push({
      form: 'Me',
      message: this.message,
      image: 'https://avatars1.githubusercontent.com/u/14917784?s=400&u=e3a98241e62966b0222a43143e1fbf166003c1b6&v=4',
      date: new Date(),
      position: 'right',
      param: {}
    });

    this.scrollToBottom();
    this.myChat.nativeElement.focus();
    this.onTextRequestDialogflow(this.message);
    this.message = '';
  }

  onTextRequestDialogflow(message?: string) {
    this.dialogflow.textRequest(message).then(response => {
      console.log(response);
      response.result.fulfillment.messages.forEach((msg, index) => {
        var timeout = index * 500;
        setTimeout(() => {
          if (msg.speech) {
            this.messages.push({
              form: this.dialogflow.agentName,
              message: msg.speech,
              image: this.dialogflow.agentImage,
              date: new Date(response.timestamp),
              position: 'left',
              param: {}
            });
          } else {
            console.log('Param: ', msg);
          }
          this.scrollToBottom();
        }, timeout);
      });
    }).catch(error => {
      console.log('error');
      console.log(error);
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
      this.resize();
    }, 0);
  }

}

export class Message {
  form: string;
  message: string;
  image: string;
  date: Date;
  position: string;
  param: any;
}
