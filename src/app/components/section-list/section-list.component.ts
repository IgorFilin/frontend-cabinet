import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { UserService } from '../../services/user.service';

interface ListType {
  title: string;
  routeLink: string;
  icon: string;
  disabled: boolean;
}
@Component({
  selector: 'cabinet-section-list',
  imports: [CommonModule, IconComponent, RouterModule, RouterLinkActive],
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
})
export class SectionListComponent {
  sectionLists: Signal<Array<ListType>> = computed(() => [
    {
      icon: 'main',
      title: 'Главная (в разработке)',
      routeLink: '/',
      disabled: true,
    },
    {
      icon: 'bot',
      title: 'Создать вопрос',
      routeLink: '/questions',
      disabled: this.userService.userRole() !== 'admin',
    },
    {
      icon: 'article',
      title: 'Создать статью',
      routeLink: '/articles',
      disabled: false,
    },
    {
      icon: 'knowledgeBase',
      title: 'База знаний',
      routeLink: '/knowledgeBase',
      disabled: false,
    },
    {
      icon: 'chat',
      title: 'Общий чат',
      routeLink: '/chat',
      disabled: false,
    },
    {
      icon: 'chat',
      title: 'Терминал',
      routeLink: '/terminal',
      disabled: this.userService.userRole() !== 'admin',
    },
    {
      icon: 'games',
      title: 'Игровая комната',
      routeLink: '/games',
      disabled: true,
    },
  ]);

  constructor(private route: Router, private userService: UserService) {}
}
