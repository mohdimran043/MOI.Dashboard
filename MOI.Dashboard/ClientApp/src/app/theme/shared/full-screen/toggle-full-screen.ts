import {Directive, ElementRef, HostListener} from '@angular/core';

import screenfull, { Screenfull } from "screenfull";

@Directive({
  selector: '[appToggleFullScreen]'
})
export class ToggleFullScreenDirective {
  constructor(private elements: ElementRef) {}

  @HostListener('click')
  onClick() {
    
    let isScreenFull = (sf: Screenfull | false): sf is Screenfull => {
      return (sf as Screenfull).isFullscreen;
    }

    if (isScreenFull(screenfull)) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request();
      }
    }
    if ((screenfull as Screenfull).enabled) {
     (this.elements).nativeElement.querySelector('.feather').classList.toggle('icon-maximize');
     (this.elements).nativeElement.querySelector('.feather').classList.toggle('icon-minimize');
     (screenfull as Screenfull).toggle();
    }
  }
}
