import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownTextareaComponent } from '../../components/markdown-textarea/markdown-textarea.component';
import { TECHNOLOGY_STACK } from '../../shared/models/constants';
import { InputComponent } from '../../shared/components/input/input.component';
import { CanDeactivate } from '@angular/router';
import { CanDeactivateType } from '../../core/guard/can-deactivate-guard';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ToasterService } from '../../services/toaster.service';
import { bubbleAnimation } from '../../animations/bubble.animation';
import { map, Observable } from 'rxjs';
import { KnowledgeService } from '../../services/knowledge.service';
import { KnowledgeRepository } from '../../infrastructure/repositories/knowledge.repository';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  imports: [CommonModule, ReactiveFormsModule, MarkdownTextareaComponent, InputComponent, SearchInputComponent, IconComponent],
  styleUrls: ['./create-article.component.scss'],
  animations: [bubbleAnimation],
})
export class CreateArticleComponent implements CanDeactivate<void> {
  // techologies: string[] = TECHNOLOGY_STACK;
  currentTag = new FormControl('');

  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    tags: new FormControl([], [Validators.required]),
  });

  constructor(private changeDetection: ChangeDetectorRef, private knowledgeService: KnowledgeService, private KnowledgeRepository: KnowledgeRepository, private toasterService: ToasterService) {}

  canDeactivate(): CanDeactivateType {
    if (this.articleForm.dirty) {
      const result = confirm('Ваши данные могут не сохранится, вы уверены?');
      return result;
    } else return true;
  }

  onRemoveTag(index: number) {
    const tags = this.articleForm.get('tags');
    if (tags) {
      tags.patchValue([...tags.value.filter((tag: any, tagIndex: number) => tagIndex !== index)]);
    }
  }

  searchTag: (value: string) => Observable<any> | undefined = (searchValue: string) => {
    return this.KnowledgeRepository.getTags(searchValue).pipe(map((resnonse) => resnonse.data?.tags));
  };

  onSetTag(tag: string) {
    const tags = this.articleForm.get('tags');

    if (tags?.value.length === 5) {
      this.toasterService.info('Набрано максимальное количество тегов');
      return;
    }

    if (tags?.value.includes(tag)) {
      this.toasterService.info('Такой тег уже есть в списке');
      return;
    }

    if (tags) {
      tags.patchValue([...tags.value, tag]);
    }
  }

  onSubmit() {
    this.knowledgeService.createArticle(this.articleForm.getRawValue()).subscribe((data) => {
      this.articleForm.reset({
        title: '',
        text: '',
        tags: [],
      });
      this.currentTag.reset();
      this.changeDetection.detectChanges();
    });
  }
}
