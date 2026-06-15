import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from '../side-menu/side-menu';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './shell.html',
})
export class Shell {}
