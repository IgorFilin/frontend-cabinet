import { Injectable } from '@angular/core';
import { IEditArticleBody } from '../models/request';
import { RequestService } from './request.service';
import { ToasterService } from './toaster.service';
import { Observable, of, tap } from 'rxjs';
import { TechnologyStackType } from '../models/types';
import { KnowledgeRepository } from '../infrastructure/repositories/knowledge.repository';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../shared/models/api.interface'

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {
  constructor(private requestService: RequestService, private toastService: ToasterService, private knowledgeRepository: KnowledgeRepository, private httpClient: HttpClient) {}

  createArticle(payload: any): Observable<any> {
    return this.httpClient.post<IApiResponse<any>>('learning/create-article', { ...payload } , {
      withCredentials: true,
    });
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
