import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  errorStore(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // Это ошибка сети
        return 'Network error occurred. Please check your internet connection.';
      } else {
        // Это серверная ошибка
        let messages = '';
        if (Array.isArray(error.error.message)) {
          error.error.message.forEach((message: string) => {
            messages += message + '\n';
          });
        } else {
          messages = error.error.message;
        }
        return messages;
      }
    } else {
      return 'Unknown error occurred.';
    }
  }
}
