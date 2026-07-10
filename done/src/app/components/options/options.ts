import { Component, input, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Button } from '../button/button';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { PopoverModule } from 'primeng/popover';

export type optionsItemType = {
  label: string;
  data: { icon: string };
};

@Component({
  selector: 'app-options',
  imports: [NgIcon, Button, MenuModule, PopoverModule],
  templateUrl: './options.html',
  styleUrl: './options.scss',
})
export class Options {
  items = input<optionsItemType[]>([]);
}
