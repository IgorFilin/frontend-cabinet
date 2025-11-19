import { Injectable, signal, WritableSignal } from '@angular/core';
import { IArticle, IArticleResponse } from '../models/interfaces';
import { IEditArticleBody } from '../models/request';
import { RequestService } from './request.service';
import { ToasterService } from './toaster.service';
import { Observable, of, tap } from 'rxjs';
import { TechnologyStackType } from '../models/types';
import { KnowledgeRepository } from '../infrastructure/repositories/knowledge.repository';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {
  constructor(private requestService: RequestService, private toastService: ToasterService, private knowledgeRepository: KnowledgeRepository) {}

  createArticle(payload: any): Observable<any> {
    return this.requestService.post<any, any>('learning/create-article', { ...payload }).pipe(
      tap((data) => {
        if (data.message) {
          this.toastService.info(data.message);
        }
      })
    );
  }

  getTag(filter: string) {
    return this.requestService.get<any, any>('learning/tags', { filter }).pipe(
      tap((data) => {
        if (data.message) {
          this.toastService.info(data.message);
        }
      })
    );
  }

  getArticles(filter?: TechnologyStackType): Observable<any> {
    this.knowledgeRepository.articles().subscribe((data) => {
      console.log('data', data);
    });
    // return this.requestService
    // .get<any,any>('gateway/articles', { filter : filter ?? '' })
    // .pipe(
    //   tap((data) => {
    //     if (data.message) {
    //       this.toastService.info(data.message);
    //     }
    //   })
    // );
    return of([]);
  }

  editArticle(body: IEditArticleBody): Observable<any> {
    return this.requestService.put<IEditArticleBody, any>('learning/edit_article', body);
  }
}
