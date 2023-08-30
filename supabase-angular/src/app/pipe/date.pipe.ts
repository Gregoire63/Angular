import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'customDatePipe', standalone: true, })
export class CustomDatePipe implements PipeTransform {
  transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd'): string|null {
    date = new Date(date);
    date.setDate(date.getDate()-day);
    return new DatePipe('en-US').transform(date, format);
  }
}
