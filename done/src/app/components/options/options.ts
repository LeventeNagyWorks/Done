import { Component, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Button } from '../button/button';

interface options {
  icon: string;
  text: string;
  onClick: void;
}

@Component({
  selector: 'app-options',
  imports: [NgIcon, Button],
  templateUrl: './options.html',
  styles: ``,
})
export class Options {
  opened = signal(false);

  handleOpen = () => {
    this.opened.set(!this.opened());
  };
}
