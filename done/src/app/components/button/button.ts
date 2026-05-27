import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

type btnType = 'neutral' | 'primary' | 'outlined';
type iconPosType = 'right' | 'left';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgIcon],
  templateUrl: './button.html',
})
export class Button {
  label = input<string>();
  btnType = input<btnType>('neutral');
  route = input<string>();
  icon = input<string>();
  class = input<string>();
  iconClass = input<string>();
  iconOnly = input<boolean>(false);
  rounded = input<boolean>(false);
  disabled = input<boolean>(false);
  glow = input<boolean>(false);
  iconPosition = input<iconPosType>('left');
  hideText = input<boolean>(false);
  hovered = signal<boolean>(false);
}
