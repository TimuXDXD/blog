import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  pages:string[] = ['home','portfolio','about'];
  curPage:boolean[] = [false, false, false];
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
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
