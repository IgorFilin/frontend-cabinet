import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { AbstractControlComponent } from '../../shared/components/abstract-control-input/abstract-control-input.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { bubbleAnimation } from '../../animations/bubble.animation';

export enum TransformText {
  CODE = 'code',
  BLOCK_CODE = 'block-code',
  LINE = 'line',
  SLASH = 'text-slash',
  SIZE_UP = 'size-up',
  ITALIC = 'italic',
  UNDER = 'under',
  LINK = 'link',
  IMAGE = 'image',
}
export interface ICopyedText {
  start: number
  end: number
  text: string
} 

@Component({
    selector: 'app-markdown-textarea',
    templateUrl: './markdown-textarea.component.html',
    styleUrls: ['./markdown-textarea.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CdkTextareaAutosize,
        MarkdownModule,
        FormsModule,
        IconComponent
    ],
    animations: [bubbleAnimation]
})
export class MarkdownTextareaComponent extends AbstractControlComponent  {
  
  @Input() title:string = ''
  @Input() cdkMinHeight:string = '6'
  @Input() cdkMaxHeight:string = '25'
  copyedText: ICopyedText | null = null;
  codeFormsToggle: boolean = false;
  fieldName: string = this.control?.name as string;
  isPreWatch: boolean = false
  transformTextEnum = TransformText
  variantsTransformText = {
    [TransformText.BLOCK_CODE]: {
      changer: () => {
        this.value = this.transformSelectedText(`\`\`\`typescript \n ${this.copyedText?.text} \n \`\`\` \n`)
      } 
    },
    [TransformText.CODE]: {
      changer: () => {
        this.value = this.transformSelectedText(`\`\`\` ${this.copyedText?.text} \`\`\``)
      } 
    },
    [TransformText.LINE]: {
      changer: () => {
        this.value = this.insertItem(`***`)
      }  
    },
    [TransformText.SLASH]: {
      changer: () => {
        this.value = this.transformSelectedText(`~~${this.copyedText?.text.trim()}~~`)
      } 
    },
    [TransformText.SIZE_UP]: {
      changer: () => {
        this.value = this.transformSelectedText(`## ${this.copyedText?.text.trim()}`)
      } 
    },
    [TransformText.ITALIC]: {
      changer: () => {
        this.value = this.transformSelectedText(`*${this.copyedText?.text.trim()}*`)
      } 
    },
    [TransformText.UNDER]: {
      changer: () => {
        this.value = this.transformSelectedText(`<u>${this.copyedText?.text.trim()}</u>`)
      } 
    },
    [TransformText.LINK]: {
      changer: () => {
        this.value = this.transformSelectedText(`[${this.copyedText?.text.trim()}](ссылка)`)
      } 
    },
    [TransformText.IMAGE]: {
      changer: () => {
        this.value = this.transformSelectedText(`![Изображение](${this.copyedText?.text.trim()} "Логотип")`)
      } 
    },
  }

  onTransformTest(mode: TransformText) {
    this.variantsTransformText[mode].changer()
    this.onChange(this.value);
    this.copyedText = null
  }

  setSelectedText(event: MouseEvent | Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
      this.copyedText = {
        start,
        end,
        text: textarea?.value?.substring(start, end),
      };
  }

  insertItem(inseredItem:string) {
    const beforeString = this.value.substring(0, this.copyedText!['start']);
    const afterString = this.value.substring(
        this.copyedText!['start'],
        this.value.length
      );
    return `${beforeString} ${inseredItem} ${afterString}`;
  }

  transformSelectedText(template:string) {
    const beforeString = this.value.substring(0, this.copyedText!['start']);
    const afterString = this.value.substring(this.copyedText!['end'], this.value.length);
    return `${beforeString} ${template} ${afterString}`;
  }

  onTextareaChange(event: Event) { 
    this.value = (event.currentTarget as HTMLTextAreaElement).value;
    this.onChange(this.value)
    this.onTouched()
    this.setSelectedText(event)
  }

  onChangeModeHandler() {
    this.codeFormsToggle = !this.codeFormsToggle;
  }

  onPreWatchHandler() {
    this.isPreWatch = !this.isPreWatch;
  }
}
