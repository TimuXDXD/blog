import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  pages:string[] = ['home','portfolio','about'];
  curPage:boolean[] = [false, false, false];
  constructor(private router: Router, private route: ActivatedRoute, private observer: BreakpointObserver) {
    this.toggleMenuPath();
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
      if(!res.matches){
        this.curPage.forEach((_, i) => this.curPage[i] = false);
        // console.log(this.router.url.slice(1));
        this.curPage[this.pages.findIndex(e => e == this.router.url.slice(1))] = true;
      }
    });
  }

  private toggleMenuPath(){
    this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.rootRoute(this.route)),
    filter((route: ActivatedRoute) => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {
      this.curPage.forEach((_, i) => this.curPage[i] = false);
      if(route.snapshot.url[0]){
        // console.log(route.snapshot.url[0].path);
        this.curPage[this.pages.findIndex(e => e == route.snapshot.url[0].path)] = true;
      }
      else
        this.curPage[0] = true;
    });
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild)
      route = route.firstChild;
    return route;
  }


}
