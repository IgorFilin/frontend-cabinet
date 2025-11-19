import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'textSlice'
})
export class TextSlicePipe implements PipeTransform {

  transform(value: any, field: string, countSlice: number): any {
    return value.map((el:any) => {
      if( el[field] && el[field].length > countSlice){
        return {...el, [field]: el[field].slice(0, countSlice) + '...'}
      } else return el
    })
  }
}
