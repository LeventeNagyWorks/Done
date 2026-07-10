import { Component, input, signal } from '@angular/core';
import { Button } from '../button/button';
import { NgTemplateOutlet } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowLeftSLine } from '@ng-icons/remixicon';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  imports: [Button, NgTemplateOutlet, NgIcon, TreeModule],
  providers: [provideIcons({ remixArrowLeftSLine })],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  isCollapsed = signal<boolean>(false);
  collapsable = input<boolean>(true);

  projects: TreeNode[] = [
    {
      label: 'Projects',
      data: { icon: 'remixLayoutMasonryFill' },
      expanded: true,
      children: [
        {
          label: 'Website Redesign',
          data: { icon: 'remixArtboardLine' },
        },
        {
          label: 'Mobile App',
          data: { icon: 'remixMindMap' },
        },
        {
          label: 'API Integration',
          data: { icon: 'remixFileList2Line' },
        },
      ],
    },
  ];
  handleCollapse = () => {
    this.isCollapsed.set(!this.isCollapsed());
  };
}
