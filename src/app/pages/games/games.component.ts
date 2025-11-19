import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'cabinet-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  games: WritableSignal<Array<any>> = signal([
    {
      title: 'Крестики-нолики',
      desc: 'Игра к крестики нолики',
      buttons: [
        {
          text: 'Пригласить',
          action: () => {
            console.log('test');
          },
        },
        {
          text: 'Войти по приглашению',
          action: () => {
            console.log('test');
          },
        },
      ],
    },
  ]);
}
