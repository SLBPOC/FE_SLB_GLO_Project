import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  @ViewChild('sidenav')
  sidenavWidth = 15;
  containervWidth = 76.5;
  ngStyle: string | undefined;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  showSubmenuReport: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  elem: any;
  renderer: any;
  constructor(
    @Inject(DOCUMENT) private document: any, render: Renderer2

  ) {
  }

  ngOnInit() {
    this.elem = document.documentElement;
  }


  sidenavToggle() {
    const abc = document.getElementById('navopen');
    if (this.sidenavWidth == 3) {
      this.sidenavWidth = 15;
      this.containervWidth = 100;
      console.log('sidenav width incrases');
      abc?.classList.add('open');
      abc?.classList.remove('close')
    }
    else {
      this.sidenavWidth = 3;
      this.containervWidth = 100;
      console.log('sidenav width decrases');
      abc?.classList.add('close');
      abc?.classList.remove('open')
      //this.addClass('disabled');
    }
    console.log('sidenav width check');
  }


  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    } else if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
