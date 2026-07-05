import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  OnDestroy,
  inject,
} from '@angular/core';
import { EditorService } from '../../services/line.service';

@Component({
  selector: 'app-texteditor',
  imports: [],
  templateUrl: './texteditor.html',
  styleUrl: './texteditor.scss',
})
export class TextEditor implements OnDestroy {
  @ViewChild('editorEl', { static: true })
  editorEl!: ElementRef<HTMLDivElement>;
  editorService = inject(EditorService);

  constructor() {
    afterNextRender(() => {
      this.editorService.init(this.editorEl.nativeElement);
    });
  }

  ngOnDestroy() {
    this.editorService.destroy();
  }
}
