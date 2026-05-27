import { Component, input, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixCheckLine } from '@ng-icons/remixicon';

@Component({
  selector: 'app-checkbox',
  imports: [NgIcon],
  templateUrl: './checkbox.html',
  providers: [provideIcons({ remixCheckLine })],
})
export class Checkbox {
  checked = model<boolean>(false);
  square = input<boolean>();

  handleClick() {
    this.checked.set(!this.checked());
  }
}
