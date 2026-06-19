import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Button } from '../button/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowLeftSLine } from '@ng-icons/remixicon';

@Component({
  selector: 'app-document-menu',
  imports: [NgTemplateOutlet, Button, NgIcon],
  providers: [provideIcons({ remixArrowLeftSLine })],
  templateUrl: './document-menu.html',
  styles: ``,
})
export class DocumentMenu {
  isCollapsed = signal<boolean>(false);

  btnClass =
    'bg-transparent px-2! text-sm text-zinc-400 hover:bg-zinc-600 justify-between ';

  handleCollapse = () => {
    this.isCollapsed.set(!this.isCollapsed());
  };
}
