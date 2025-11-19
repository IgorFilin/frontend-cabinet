import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  globalOptions: any = {
    positionClass: 'toast-bottom-left',
  };

  success(message: string, title?: string) {
    this.toastr.success(message, title, this.globalOptions);
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title, this.globalOptions);
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title, this.globalOptions);
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title, this.globalOptions);
  }
}
