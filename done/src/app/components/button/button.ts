import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowDownSLine } from '@ng-icons/remixicon';
import { TooltipModule } from 'primeng/tooltip';
import { NavItem } from '../nav-item/nav-item';

type btnSizeType = 'small' | 'medium' | 'large';
type btnType = 'neutral' | 'primary' | 'outlined';
export type tooltipPositionType = 'top' | 'bottom' | 'right' | 'left';
type iconPosType = 'right' | 'left';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgIcon, TooltipModule, NavItem],
  providers: [provideIcons({ remixArrowDownSLine })],
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
  isCollapsed = input<boolean>(false);
  isDropdown = input<boolean>(false);
  isDropdownCollapsed = signal<boolean>(false);
  tooltip = input<string>();
  tooltipPosition = input<tooltipPositionType>();
  btnSize = input<btnSizeType>('medium');
}
