import { Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.html',
  styles: ``,
})
export class Label {
  label = input.required<string>();
}
