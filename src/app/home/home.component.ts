import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  time$: Observable<any>;

  constructor(private appService: AppService) {
    this.time$ = this.appService.getDate();
  }

  ngOnInit(): void {
  }

}
