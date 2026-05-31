import {
  afterNextRender,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  LineNodeData,
  LineService,
} from '../../../services/line.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  remixArrowRightSLine,
  remixDraggable,
} from '@ng-icons/remixicon';
import { Checkbox } from '../../checkbox/checkbox';
import { DragStateService } from '../../../services/drag-state.service';

@Component({
  selector: 'app-line-node',
  imports: [forwardRef(() => LineNode), Checkbox, NgIcon],
  templateUrl: './line-node.html',
  providers: [provideIcons({ remixArrowRightSLine, remixDraggable })],
  styles: ``,
})
export class LineNode {
  node = input.required<LineNodeData>();
  lineService = inject(LineService);
  hovered = signal<boolean>(false);
  dropIndicator = signal<'before' | 'after' | 'child' | null>(null);
  dragState = inject(DragStateService);
  private el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const input = this.el.nativeElement.querySelector(
        `#line-input-${this.node().id}`,
      );
      if (input) input.innerHTML = this.node().content;
    });
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newId = this.lineService.insertAfter(this.node().id);
      setTimeout(() =>
        document.getElementById(`line-input-${newId}`)?.focus(),
      );
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        this.lineService.outdent(this.node().id);
      } else {
        this.lineService.indent(this.node().id);
      }
      setTimeout(() =>
        document
          .getElementById(`line-input-${this.node().id}`)
          ?.focus(),
      );
      return;
    }
    if (event.key === 'Backspace') {
      const el = event.target as HTMLElement;
      if (el.innerText === '' || el.innerText === '\n') {
        event.preventDefault();
        const prevId = this.lineService.getPreviousId(this.node().id);
        this.lineService.deleteNode(this.node().id);
        if (prevId)
          setTimeout(() =>
            document.getElementById(`line-input-${prevId}`)?.focus(),
          );
      }
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevId = this.lineService.getPreviousId(this.node().id);
      if (prevId)
        document.getElementById(`line-input-${prevId}`)?.focus();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextId = this.lineService.getNextId(this.node().id);
      if (nextId)
        document.getElementById(`line-input-${nextId}`)?.focus();
    }
  }

  handleInput(event: Event): void {
    this.lineService.updateContent(
      this.node().id,
      (event.target as HTMLElement).innerHTML,
    );
  }

  handleDragStart(event: DragEvent): void {
    event.stopPropagation();
    this.dragState.draggedId.set(this.node().id);
    event.dataTransfer?.setData('text/plain', this.node().id);
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const rect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const y = event.clientY - rect.top;
    const ratio = y / rect.height;
    if (ratio < 0.3) this.dropIndicator.set('before');
    else if (ratio > 0.7) this.dropIndicator.set('after');
    else this.dropIndicator.set('child');
  }

  handleDragLeave(): void {
    this.dropIndicator.set(null);
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const sourceId = this.dragState.draggedId();
    const indicator = this.dropIndicator();
    if (sourceId && indicator) {
      this.lineService.moveNode(sourceId, this.node().id, indicator);
    }
    this.dropIndicator.set(null);
    this.dragState.draggedId.set(null);
  }

  handleDragEnd(): void {
    this.dropIndicator.set(null);
    this.dragState.draggedId.set(null);
  }
}
