import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { rxResource } from '@angular/core/rxjs-interop';
import { computed, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EMPTY } from 'rxjs';
import { KnowledgeRepository } from '../infrastructure/repositories/knowledge.repository';
import { IArticleResponse } from '../models/interfaces';

export const ArticleStore = signalStore(
  { providedIn: 'root' },
  withProps((_, authService = inject(AuthService), knowledgeApi = inject(KnowledgeRepository)) => ({
    _recource: rxResource({
      request: () => authService.isAuth(),
      loader: ({ request }) => {
        if (!request) return EMPTY;
        return knowledgeApi.articles();
      },
    }).asReadonly(),
  })),
  withComputed((store) => ({
    articles: computed<IArticleResponse[]>(() => store._recource.value()?.data || []),
    isLoading: computed(() => store._recource.isLoading()),
  })),
  withMethods((store) => ({
    refresh:() => store._recource.reload()
  }))
);
