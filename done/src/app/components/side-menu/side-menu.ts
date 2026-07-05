import { Component, input, signal } from '@angular/core';
import { Button } from '../button/button';
import { NgTemplateOutlet } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowLeftSLine } from '@ng-icons/remixicon';

@Component({
  selector: 'app-side-menu',
  imports: [Button, NgTemplateOutlet, NgIcon],
  providers: [provideIcons({ remixArrowLeftSLine })],
  templateUrl: './side-menu.html',
  styles: ``,
})
export class SideMenu {
  isCollapsed = signal<boolean>(false);
  collapsable = input<boolean>(true);

  btnClass =
    'bg-transparent! px-2! text-sm text-zinc-400 hover:bg-zinc-600! justify-between ';

  handleCollapse = () => {
    this.isCollapsed.set(!this.isCollapsed());
  };
}
