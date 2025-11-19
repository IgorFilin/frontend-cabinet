import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  readonly DEVICE_ID_KEY = 'deviceId';

  constructor() {}

  private generateUUIDDevice(): string | null {
    if (window.crypto) {
      return window.crypto.randomUUID();
    }

    return null;
  }

  private setLocalStorageDeviceId(deviceId: string | null) {
    try {
      if (!deviceId) return;
      localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
    } catch {
      return;
    }
  }

  public getUUIDDevice(): string | null {
    const UUID = localStorage.getItem(this.DEVICE_ID_KEY);
    if (UUID) return UUID;

    const newUUID = this.generateUUIDDevice();
    this.setLocalStorageDeviceId(newUUID);
    return UUID;
  }
}
