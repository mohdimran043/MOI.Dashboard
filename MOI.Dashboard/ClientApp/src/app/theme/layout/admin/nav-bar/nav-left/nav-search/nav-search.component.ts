import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  public searchInterval: any;
  public searchWidth: number;
  public searchWidthString: string;

  private prevUrl: string;

  constructor(private router: Router) {
    this.searchWidth = 0;
  }

  ngOnInit() {
    this.router.events
      .filter(e => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {
        this.prevUrl = event[0].urlAfterRedirects;
      });
  }

  searchOn() {
    document.querySelector('#main-search').classList.add('open');
    this.searchInterval = setInterval(() => {
      if (this.searchWidth >= 170) {
        clearInterval(this.searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 30;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    this.searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(this.searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth - 30;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  loadSearch() {
    this.router.navigate(['/search']);
  }

  loadPrevUrl() {
    this.router.navigate([this.prevUrl]);
  }

  isEscKey(e) {
    if (e.key === "Escape") {
      // document.querySelector(e.srcElement).blur();
      this.loadPrevUrl();
    }
  }

}
