import { Component, input, model, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowDownSLine } from '@ng-icons/remixicon';

export interface DropdownOption {
  label: string;
  onClick: () => void;
}

@Component({
  selector: 'app-dropdown',
  imports: [NgIcon],
  templateUrl: './dropdown.html',
  providers: [provideIcons({ remixArrowDownSLine })],
})
export class Dropdown {
  opened = signal<boolean>(false);
  options = input<DropdownOption[]>([]);
  selected = model<DropdownOption | null>(null);

  handleOpen = () => {
    this.opened.set(!this.opened());
    console.log('Opened!');
  };
}
