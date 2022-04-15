import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog';
  TopMenuOn = true;
  curPage= 'home';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public constructor(private titleService: Title, private observer: BreakpointObserver, private router: Router) {
    this.titleService.setTitle(this.title);
  }

  public negativePage(pageName: string){
    this.router.navigate([pageName]);
    this.curPage = pageName;
  }

  public clickSidenavMenu(){
    this.sidenav.close();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
      this.sidenav.close();
      if(res.matches){
        this.sidenav.mode = 'over';
        this.TopMenuOn = false;
      }
      else{
        this.sidenav.mode = 'side';
        this.TopMenuOn = true;
      }
    });
  }

}
