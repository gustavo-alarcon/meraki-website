import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as AOS from 'aos';
import { Router } from '@angular/router';
import { WindowRefService } from '../core/window-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scrollValue: number = 0;

  // content: string = 'app';

  @ViewChild('ms_image_container', {static: true}) image_container: ElementRef;
  @ViewChild('ms_image', {static: true}) landing_image: ElementRef;
  @ViewChild('nav_landing', {static: true}) navbar: ElementRef;
  @ViewChild('nav_logo', {static: true}) nav_logo: ElementRef;
  @ViewChild('nav_landing_small', {static: true}) navbar_small: ElementRef;

  constructor(
    private route: Router,
    private window: WindowRefService
  ) {
  }

  ngOnInit() {
    AOS.init();
  }

  ngAfterViewInit() {

    // let image_container = document.getElementById('ms_image_container');

    // this.image = document.getElementById('ms_image');

    // let navbar = document.getElementById('nav_landing');
    // let nav_logo = document.getElementById('nav_logo');

    // let navbar_small = document.getElementById('nav_landing_small');


    // setting landing image
    this.changeTopic(this.route.url.split('/')[2]);

    this.window.nativeWindow.addEventListener('scroll', () => {
      this.scrollValue = this.window.nativeWindow.scrollY;
      let winHeight = this.window.nativeWindow.innerHeight;

      this.image_container.nativeElement.style.top = -this.scrollValue * 0.5 + 'px';

      if (this.scrollValue >= (winHeight * 0.85)) {
        this.navbar.nativeElement.style.position = 'fixed';
        this.navbar.nativeElement.style.top = '0%'
        this.navbar.nativeElement.style.width = '66vw';
        this.navbar.nativeElement.style.zIndex = '100';

        this.nav_logo.nativeElement.style.position = 'relative'
        this.nav_logo.nativeElement.style.display = 'block'

        this.navbar_small.nativeElement.style.position = 'fixed';
        this.navbar_small.nativeElement.style.top = '0%';
        this.navbar_small.nativeElement.style.width = '82vw';
        this.navbar_small.nativeElement.style.zIndex = '100';

      } else {
        this.navbar.nativeElement.style.position = 'relative';

        this.nav_logo.nativeElement.style.position = 'absolute'
        this.nav_logo.nativeElement.style.display = 'none'

        this.navbar_small.nativeElement.style.position = 'relative';

      }
    })
  }

  changeTopic(topic: string): void {

    if (topic == 'applications') {
      this.landing_image.nativeElement.style.backgroundImage = 'url(../../assets/images/app-white.jpg)';
    }

    if (topic == 'big-data') {
      this.landing_image.nativeElement.style.backgroundImage = 'url(../../assets/images/bd-white.jpg)';
    }

    if (topic == 'websites') {
      this.landing_image.nativeElement.style.backgroundImage = 'url(../../assets/images/web-white.jpg)';
    }

    if (topic == 'i2ot') {
      this.landing_image.nativeElement.style.backgroundImage = 'url(../../assets/images/i2ot-white.jpg)';
    }

    if (topic == 'about-us') {
      this.landing_image.nativeElement.style.backgroundImage = 'url(../../assets/images/i2ot-white.jpg)';
    }

  }

}
