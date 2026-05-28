import { Component, input, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixCheckLine } from '@ng-icons/remixicon';
import { Label } from "../label/label";

@Component({
  selector: 'app-checkbox',
  imports: [NgIcon, Label],
  templateUrl: './checkbox.html',
  providers: [provideIcons({ remixCheckLine })],
})
export class Checkbox {
  checked = model<boolean>(false);
  square = input<boolean>(false);
  label = input<string>();

  handleClick() {
    this.checked.set(!this.checked());
  }
}
