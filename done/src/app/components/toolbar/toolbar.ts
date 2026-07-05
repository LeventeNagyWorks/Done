import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
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
import { EditorService } from '../../services/line.service';
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
  editorService = inject(EditorService);
  private cdr = inject(ChangeDetectorRef);

  get e() {
    return this.editorService.editor;
  }

  constructor() {
    afterNextRender(() => {
      // Toolbar gombok active state-je frissüljön minden kurzormozgásra
      this.editorService.editor?.on('transaction', () => {
        this.cdr.detectChanges();
      });
    });
  }

  isActive(name: string, attrs?: object) {
    return this.e?.isActive(name, attrs) ?? false;
  }

  undo = () => this.e?.chain().focus().undo().run();
  redo = () => this.e?.chain().focus().redo().run();
  bold = () => this.e?.chain().focus().toggleBold().run();
  italic = () => this.e?.chain().focus().toggleItalic().run();
  underline = () => this.e?.chain().focus().toggleUnderline().run();

  setCheckbox = (
    type: 'default' | 'square' | 'list' | 'ordered' | 'none',
  ) => this.editorService.setCheckbox(type);

  duplicate = () => this.editorService.duplicate();

  indent = () => {
    if (!this.e?.chain().focus().sinkListItem('listItem').run())
      this.e?.chain().focus().sinkListItem('taskItem').run();
  };

  outdent = () => {
    if (!this.e?.chain().focus().liftListItem('listItem').run())
      this.e?.chain().focus().liftListItem('taskItem').run();
  };
}
