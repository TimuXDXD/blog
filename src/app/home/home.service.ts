import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(public datepipe: DatePipe) {}
  date = new Date();

  getDate() {
    return timer(0, 1000).pipe(map((_) => this.getDateTime()));
  }

  // get new time by adding + sec
  private getDateTime() {
    this.date = new Date();
    // this.date.setSeconds(this.date.getSeconds() + 1);
    return (this.datepipe.transform(this.date, 'EEEE, MMM d, y, HH:mm:ss z'));
  }
}
