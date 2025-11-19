import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IArticleResponse, ITagsResponse } from '../../models/interfaces';
import { IApiResponse } from '../../shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeRepository {
  private readonly httpClient = inject(HttpClient);

  articles(): Observable<IApiResponse<IArticleResponse[]>> {
    return this.httpClient.post<IApiResponse<IArticleResponse[]>>('gateway/articles', {});
  }

  getArticle(id: string): Observable<IApiResponse<IArticleResponse>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    return this.httpClient.get<IApiResponse<IArticleResponse>>('gateway/article', { params: httpParams });
  }

  getTags(filter: string): Observable<IApiResponse<ITagsResponse>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('filter', filter);
    return this.httpClient.get<IApiResponse<ITagsResponse>>('gateway/tags', { params: httpParams });
  }
}
