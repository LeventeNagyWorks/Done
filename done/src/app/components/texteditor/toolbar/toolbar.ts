import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  remixArrowGoBackFill,
  remixArrowGoForwardFill,
  remixCheckboxCircleLine,
  remixCheckboxLine,
  remixFileCopy2Line,
  remixIndentDecrease,
  remixIndentIncrease,
  remixListOrdered2,
  remixListUnordered,
} from '@ng-icons/remixicon';
import {
  LineNodeData,
  LineService,
} from '../../../services/line.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-toolbar',
  imports: [NgTemplateOutlet, NgIcon, TooltipModule],
  templateUrl: './toolbar.html',
  providers: [
    provideIcons({
      remixCheckboxCircleLine,
      remixCheckboxLine,
      remixListOrdered2,
      remixListUnordered,
      remixIndentDecrease,
      remixIndentIncrease,
      remixFileCopy2Line,
      remixArrowGoBackFill,
      remixArrowGoForwardFill,
    }),
  ],
  styles: ``,
})
export class Toolbar {
  lineService = inject(LineService);

  handleIndent = () => {
    const id = this.lineService.focusedId();
    if (id) this.lineService.indent(id);
  };

  handleOutdent = () => {
    const id = this.lineService.focusedId();
    if (id) this.lineService.outdent(id);
  };

  handleDuplicate = () => {
    const id = this.lineService.focusedId();
    if (id) this.lineService.duplicate(id);
  };

  handleBold = () => {
    document.execCommand('bold');
  };

  handleItalic = () => {
    document.execCommand('italic');
  };

  handleUnderline = () => {
    document.execCommand('underline');
  };

  handleSetCheckbox = (type: LineNodeData['checkboxType']) => {
    const id = this.lineService.focusedId();
    if (id) this.lineService.setCheckbox(id, type);
  };
}
