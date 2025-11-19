import { Pipe, PipeTransform } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Pipe({
  standalone: true,
  name: 'transformHtmlInCode',
})
export class TransformHtmlInCodePipe implements PipeTransform {
  transform(value: string, language: string = 'typescript'): string {
    return Prism.highlight(value, Prism.languages[language], language);
  }
}
