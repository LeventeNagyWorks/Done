import { Component, input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-nav-item',
  imports: [TooltipModule],
  templateUrl: './nav-item.html',
  styles: ``,
})
export class NavItem {
  isCollapsed = input<boolean>(false);
  isLast = input<boolean>(false);
  emoji = input<string>();
  label = input<string>();
}
