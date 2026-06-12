import { Component, signal } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-side-menu',
  imports: [Button],
  templateUrl: './side-menu.html',
  styles: ``,
})
export class SideMenu {
  isCollapsed = signal<boolean>(false);
}
