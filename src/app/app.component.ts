import { Component, ViewChild, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog';
  toolbarOn = true;
  TopMenuOn = true;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public constructor(private titleService: Title, private observer: BreakpointObserver) {
    this.titleService.setTitle(this.title);
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

  @HostListener('document:wheel', ['$event'])
  onScroll($event:any): void {
    if($event.wheelDeltaY > 0){
      // console.log('Up');
      this.toolbarOn = true;
    }
    else if($event.wheelDeltaY < -50){
      // console.log('Down');
      this.toolbarOn = false;
    }
  }
}
