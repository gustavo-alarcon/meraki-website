import { Component, OnInit } from '@angular/core';

import * as AOS from 'aos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scrollValue: number = 0;

  image: any;

  content: string = 'app';

  constructor(
    private route: Router
  ) {
  }

  ngOnInit() {
    AOS.init();
  }

  ngAfterViewInit() {

    let image_container = document.getElementById('ms_image_container');

    this.image = document.getElementById('ms_image');

    let navbar = document.getElementById('nav_landing');
    let nav_logo = document.getElementById('nav_logo');

    let navbar_small = document.getElementById('nav_landing_small');



    console.log(window.innerWidth, window.innerHeight);

    window.addEventListener('scroll', () => {
      this.scrollValue = window.scrollY;
      let winHeight = window.innerHeight;

      image_container.style.top = -this.scrollValue * 0.5 + 'px';

      if (this.scrollValue >= (winHeight * 0.85)) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0%'
        navbar.style.width = '66vw';
        navbar.style.zIndex = '100';

        nav_logo.style.position = 'relative'
        nav_logo.style.display = 'block'

        navbar_small.style.position = 'fixed';
        navbar_small.style.top = '0%';
        navbar_small.style.width = '82vw';
        navbar_small.style.zIndex = '100';

      } else {
        navbar.style.position = 'relative';

        nav_logo.style.position = 'absolute'
        nav_logo.style.display = 'none'

        navbar_small.style.position = 'relative';

      }
    })
  }

  changeTopic(topic: string): void {

    if (topic == 'app') {
      this.image.style.backgroundImage = 'url(../../assets/images/app-white.jpg)';
    }

    if (topic == 'bd') {
      this.image.style.backgroundImage = 'url(../../assets/images/bd-white.jpg)';
    }

    if (topic == 'web') {
      this.image.style.backgroundImage = 'url(../../assets/images/web-white.jpg)';
      this.content = 'web';
    }

    if (topic == 'i2ot') {
      this.image.style.backgroundImage = 'url(../../assets/images/i2ot-white.jpg)';
      this.content = 'i2ot';
    }

  }

}
