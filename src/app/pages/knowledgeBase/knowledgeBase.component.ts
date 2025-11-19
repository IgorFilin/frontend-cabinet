import { Component, computed, effect, inject, Inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { CommonModule } from '@angular/common';
import { TECHNOLOGY_STACK } from '../../shared/models/constants';
import { TechnologyStackType } from '../../models/types';
import { MarkdownModule } from 'ngx-markdown';
import { Router, RouterModule, UrlSegment } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TextSlicePipe } from '../../pipes/text-slice.pipe';
import { KnowledgeService } from '../../services/knowledge.service';
import { ArticleStore } from '../../store/articles.store';

@Component({
  selector: 'app-knowledgeBase',
  templateUrl: './knowledgeBase.component.html',
  imports: [CommonModule, MarkdownModule, RouterModule, IconComponent, TextSlicePipe],
  styleUrls: ['./knowledgeBase.component.scss'],
})
export class KnowledgeBaseComponent implements OnInit {
  dataPaginationArticles: any = [];
  techologies: TechnologyStackType[] = TECHNOLOGY_STACK;
  currentPage: WritableSignal<number> = signal(1);
  dataArticlesInPage: number = 10;
  start: number = 0;
  end: number = 0;
  pagination: number[] = [];

  readonly articleStore = inject(ArticleStore);

  readonly dataArticles = computed(() => this.articleStore.articles());
  readonly isLoading = computed(() => this.articleStore.isLoading());

  ngOnInit(): void {
    this.articleStore.refresh();
  }

  private readonly setDataArticles = effect(() => {
    if (this.isLoading()) return;
    this.dataPaginationArticles = this.dataArticles().slice(this.start, this.end + this.dataArticlesInPage);
    this.initialPagination();
  });

  filteredPagination(page: number) {
    const start = this.dataArticlesInPage * page;
    const end = this.dataArticlesInPage * page + this.dataArticlesInPage;

    this.dataPaginationArticles = this.dataArticles().slice(start, end);
  }

  initialPagination() {
    for (let i = 0; i < Math.floor(this.dataArticles().length / this.dataArticlesInPage); i++) {
      this.pagination.push(i + 1);
    }
  }

  setPage(page: number) {
    this.currentPage.set(page);
    this.filteredPagination(page);
  }
}
