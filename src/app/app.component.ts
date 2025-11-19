import { Component, computed, effect, inject, OnInit, Signal, viewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingService } from './services/loading.service';
import { SectionListComponent } from './components/section-list/section-list.component';
import { IsOpenCloseService } from './services/is-open-close.service';
import { CommonModule } from '@angular/common';
import { slideInOutAnimation } from './animations/slide-in-out.animations';
import { PopupComponent } from './shared/components/popup/popup.component';
import { PopupService } from './services/popup.service';
import { bubbleAnimation } from './animations/bubble.animation';
import { SocketUsersService } from './services/socket-users.service';
import { UserService } from './services/user.service';
import { UserStore } from './store/user.store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SectionListComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInOutAnimation, bubbleAnimation],
})
export class AppComponent implements OnInit {
  title = 'personal_cabinet';
  isOpenMenu: boolean | null = null;
  isOpenedPopup: Signal<boolean> = computed(() => this.popupService.isOpened());
  htmlRef: any;
  popupContainer: Signal<ViewContainerRef | undefined> = viewChild('popupContainer', { read: ViewContainerRef });
  userStore = inject(UserStore);

  constructor(
    private userService: UserService,
    private socketUsersService: SocketUsersService,
    public loadingService: LoadingService,
    private isOpenCloseService: IsOpenCloseService,
    private popupService: PopupService,
    private httpClient: HttpClient
  ) {
    effect(() => {
      if (this.userStore.userInfoData()?.isAuth) {
        this.socketUsersService.initConnection();
      } else {
        this.socketUsersService.closeConnection();
      }
    });
  }

  ngOnInit() {
    this.isOpenCloseService.dataToggle.subscribe((data) => {
      this.isOpenMenu = data['menu'];
    });
    this.popupService.initialize(this.popupContainer()!);
  }
}
