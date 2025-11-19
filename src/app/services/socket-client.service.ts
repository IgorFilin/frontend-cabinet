import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserStore } from '../store/user.store';
import { IResponseUserDataWs, IUsersWs } from '../models/interfaces';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketClientService {
  private socket: any;
  private chatUrl: string = environment.chatBaseUrl;
  isConnected = signal(false);
  isLoading = signal(true);
  messages: WritableSignal<Array<any>> = signal([]);
  typingUsers: WritableSignal<IUsersWs[]> = signal([]);
  userStore = inject(UserStore);

  constructor() {
    this.initConnection();
  }

  initConnection() {
    this.socket = new WebSocket(`${this.chatUrl}/chat?id=${this.userStore.userInfoData()?.id}&name=${this.userStore.userInfoData()?.name}`);

    this.socket.onopen = () => {
      this.isConnected.set(true);
      this.isLoading.set(false);
    };

    this.socket.onmessage = (event: any) => {
      const eventData: IResponseUserDataWs = JSON.parse(event.data);
      switch (eventData.Event) {
        case 'start_typing':
          console.log('Пользователь начал печатать', eventData.Names);
          this.typingUsers.set(eventData.Names);
          break;
        case 'stop_typing':
          console.log('Пользователь закончил печатать');
          this.typingUsers.set(eventData.Names);
          break;
        default:
          this.messages.update((messages: any) => {
            const updatedMessage = [...messages, eventData];
            if (eventData.Message.IsRemoved) {
              updatedMessage.shift();
            }
            return updatedMessage;
          });
          break;
      }
    };

    this.socket.onclose = () => {
      this.isLoading.set(false);
    };

    this.socket.onerror = (error: any) => {
      console.log('Ошибка', error);
    };
  }

  sendMessage(data: string) {
    this.socket.send(JSON.stringify({ event: '', message: data }));
  }

  sendTypingEvent(isTyping: boolean) {
    let typing = isTyping ? 'start_typing' : 'stop_typing';
    this.socket.send(JSON.stringify({ event: typing }));
  }
}
