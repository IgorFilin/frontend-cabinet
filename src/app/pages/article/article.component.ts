import { Component, computed, DestroyRef, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { IArticleResponse } from '../../models/interfaces';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { UserStore } from '../../store/user.store';
import { bubbleAnimation } from '../../animations/bubble.animation';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownTextareaComponent } from '../../components/markdown-textarea/markdown-textarea.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { KnowledgeService } from '../../services/knowledge.service';
import { IEditArticleBody } from '../../models/request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster.service';
import { PopupService } from '../../services/popup.service';
import { RequestService } from '../../services/request.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { KnowledgeRepository } from '../../infrastructure/repositories/knowledge.repository';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [CommonModule, MarkdownModule, IconComponent, ReactiveFormsModule, MarkdownTextareaComponent, InputComponent],
  animations: [bubbleAnimation],
})
export class ArticleComponent implements OnInit {
  isYourArticle: Signal<boolean> = computed(() => this.userStore.userId() === this.article()?.user?.id);
  articleId: WritableSignal<string> = signal<string>('');
  article: WritableSignal<IArticleResponse | null> = signal(null);
  isEditMode: WritableSignal<boolean> = signal(false);
  userStore = inject(UserStore);
  editedArticleForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  destroyRef = inject(DestroyRef);

  private readonly initializeEffect = effect(() => {
    this.knowledgeRepository.getArticle(this.articleId()).subscribe((articleData) => {
      this.article.set(articleData.data!);
      this.setInitialDataArticle();
      this.initializeEffect.destroy();
    });
  });

  constructor(
    private knowledgeService: KnowledgeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private popupService: PopupService,
    private requestService: RequestService,
    private knowledgeRepository: KnowledgeRepository
  ) {}

  setInitialDataArticle() {
    this.editedArticleForm.patchValue({
      title: this.article()?.title,
      description: this.article()?.description,
    });
  }

  ngOnInit() {
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (articleId) this.articleId.set(articleId);
  }

  onSaveArticleHandler() {
    const formData = {
      id: this.article()?.id ?? '',
      ...this.editedArticleForm.getRawValue(),
    } as IEditArticleBody;
    this.knowledgeService
      .editArticle(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (updatedArticle) => {
          this.isEditMode.set(false);
          this.article.set(updatedArticle);
          this.setInitialDataArticle();
        },
        (error) => {
          const errorMessage = error.error.message || 'К сожалению произошла ошибка';
          this.toasterService.error(errorMessage);
        }
      );
  }

  deleteArticleOpenPopup() {
    this.popupService.createPopup({
      title: 'Вы точно хотите удалить статью?',
      buttons: [
        {
          text: 'Удалить',
          action: this.deleteArticle.bind(this),
        },
        {
          text: 'Отмена',
          action: () => {
            this.popupService.close();
          },
        },
      ],
    });
  }

  private deleteArticle() {
    this.requestService
      .delete<any, any>('learning/article', { id: this.articleId() })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.popupService.close()),
        catchError(() => {
          this.toasterService.error('Произошла ошибка');
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data?.result) {
          this.router.navigateByUrl('/knowledgeBase');
          this.toasterService.success('Статья удалена');
        } else {
          this.toasterService.error(data.message);
        }
      });
  }
}
