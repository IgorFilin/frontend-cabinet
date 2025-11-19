import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, OnInit, resource, ResourceRef, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SocketClientService } from '../../services/socket-client.service';
import { debounceTime, firstValueFrom, tap } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Filter } from 'bad-words';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SocketClientService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  isConnected = computed(() => this.socketClientService.isConnected());
  isLoadingConnected = computed(() => this.socketClientService.isLoading());
  typingUsers = computed(() => this.socketClientService.typingUsers());

  message = new FormControl({ value: '', disabled: true });
  messages = computed(() => {
    this.scrollMessageBlockOnBottom();
    return this.socketClientService.messages();
  });
  isTyping: boolean = false;
  filter = new Filter();

  messageBlock = viewChild<ElementRef>('messageBlock');

  constructor(private socketClientService: SocketClientService, private requestService: RequestService) {
    effect(() => {
      if (this.messages()) {
        setTimeout(() => {
          this.scrollMessageBlockOnBottom();
        });
      }
    });

    effect(() => {
      if (this.isConnected()) {
        this.message.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.watcherChangesMessage();
  }

  private scrollMessageBlockOnBottom() {
    const messageBlockElem = this.messageBlock()?.nativeElement;
    messageBlockElem.scrollTop = messageBlockElem.scrollHeight;
  }

  watcherChangesMessage() {
    this.message.valueChanges
      .pipe(
        tap(() => {
          if (!this.isTyping) {
            this.socketClientService.sendTypingEvent(true);
            this.isTyping = true;
          }
        }),
        debounceTime(1000)
      )
      .subscribe(() => {
        this.isTyping = false;
        this.socketClientService.sendTypingEvent(false);
      });
  }

  sendMessage() {
    const message: string = this.filter.clean(this.message.value || '');
    this.socketClientService.sendMessage(message);
    this.message.reset('', { emitEvent: false });
  }
}
