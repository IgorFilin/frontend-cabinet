import { computed, inject, Injectable, signal } from '@angular/core';
import { UserStore } from '../store/user.store';

@Injectable({
  providedIn: 'root',
})
export class SocketUsersService {
  socket: any;
  userStore = inject(UserStore);
  connectedUsers = signal(null);

  initConnection() {
    this.socket = new WebSocket(`ws://localhost:3002/ws/users?id=${this.userStore.userInfoData()?.id}&name=${this.userStore.userInfoData()?.name}`);

    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ IsConnected: true }));
    };

    this.socket.onmessage = (event: any) => {
      this.connectedUsers.set(event.data);
    };

    this.socket.onclose = () => {
      this.connectedUsers.set(null);
      console.log('Подключение к микросервису юзерс закрыто');
    };

    this.socket.onerror = (error: any) => {
      console.log('Подключение к микросервису юзерс с ошибкой');
    };
  }

  closeConnection() {
    this.socket?.close();
  }
}
