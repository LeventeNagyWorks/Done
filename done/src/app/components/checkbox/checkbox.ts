import { Component, input, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixCheckLine } from '@ng-icons/remixicon';
import { Label } from '../label/label';

export type checkboxType =
  | 'none'
  | 'default'
  | 'square'
  | 'list'
  | 'ordered';

@Component({
  selector: 'app-checkbox',
  imports: [NgIcon, Label],
  templateUrl: './checkbox.html',
  providers: [provideIcons({ remixCheckLine })],
})
export class Checkbox {
  type = input<checkboxType>('default');
  checked = model<boolean>(false);
  label = input<string>();
  num = input<string>();

  handleClick() {
    this.checked.set(!this.checked());
  }
}
