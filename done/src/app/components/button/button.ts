import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowDownSLine } from '@ng-icons/remixicon';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

type btnSizeType = 'small' | 'large';
type severityType = 'primary' | 'secondary';
type variantType = 'outlined' | 'text' | undefined;
export type tooltipPositionType = 'top' | 'bottom' | 'right' | 'left';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgIcon, TooltipModule, ButtonModule],
  providers: [provideIcons({ remixArrowDownSLine })],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  route = input<string>();
  label = input<string>();
  icon = input<string>();
  size = input<btnSizeType>();
  fluid = input<boolean>(false);
  rounded = input<boolean>(false);
  severity = input<severityType>('secondary');
  variant = input<variantType>();
  tooltip = input<string>();
  tooltipPosition = input<tooltipPositionType>();
  btnSize = input<btnSizeType>();
  styleClass = input<string>();
}
