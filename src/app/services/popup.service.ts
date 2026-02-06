import { Injectable, signal, ViewContainerRef, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PopupService {
  public isOpened: WritableSignal<boolean> = signal(false);
  containerPopup!: ViewContainerRef;
  initialize(popupContainerRef: ViewContainerRef) {
    this.containerPopup = popupContainerRef;
  }

  async createPopup(data: { title: string; description?: string; buttons?: Array<{ text: string; action: () => void }> }, onClose?: () => void) {
    const { PopupComponent } = await import('../shared/components/popup/popup.component');
    const createdComponentPopup = this.containerPopup.createComponent(PopupComponent);
    this.isOpened.set(true);
    for (const key in data) {
      createdComponentPopup.setInput(key, data[key as keyof typeof data]);
    }

    const onCloseHandler = onClose as () => {};
    createdComponentPopup.onDestroy(() => {
      this.isOpened.set(false);
      if (onClose) {
        onCloseHandler();
      }
    });
  }

  close() {
    this.containerPopup.clear();
  }
}
