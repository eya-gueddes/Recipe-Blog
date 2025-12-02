import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToTime'
})
export class MinutesToTimePipe implements PipeTransform {

  transform(minutes: number | undefined): string {
    if (!minutes || minutes < 0)
      return '0 mins';

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs == 0)
      return `${mins} mins`;

    if (mins == 0)
      return `${hrs}`;

    return `${hrs} hr ${mins} mins`;
  }

}
