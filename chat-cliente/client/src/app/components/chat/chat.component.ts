import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userChat = { 
    user: ' ',
    text: ' '
  }

  myMessages: any; 
  eventName = "send-message"

  constructor(private activated: ActivatedRoute, private webService: WebSocketService) { }


  ngOnInit(): void {
    //Cargar todos los mensajes
    const id = this.activated.snapshot.params.id;
    this.userChat.user = id;
    this.webService.listen('text-event').subscribe((data => {
      console.log("dato: " + data)
      this.myMessages = data
    })) 

  }

  myMessage() {
    console.log(this.userChat.text)

    if(this.userChat.text != ""){
      this.webService.emit(this.eventName, this.userChat);
      this.userChat.text = ''
    }

  }

}
