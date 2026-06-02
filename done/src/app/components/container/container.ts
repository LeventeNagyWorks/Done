import { Component, input } from '@angular/core';

@Component({
  selector: 'app-container',
  host: { class: 'w-full flex-1 flex flex-col' },
  imports: [],
  templateUrl: './container.html',
  styles: ``,
})
export class Container {
  innerClass = input<string>();
}
