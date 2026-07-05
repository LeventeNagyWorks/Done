import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Editor } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    duplicateNode: {
      duplicateNode: () => ReturnType;
    };
    toggleCollapse: {
      toggleCollapse: () => ReturnType;
    };
    setCheckboxType: {
      setCheckboxType: (
        type: 'default' | 'square' | 'list' | 'ordered' | 'none',
      ) => ReturnType;
    };
    cycleCheckboxType: {
      cycleCheckboxType: () => ReturnType;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class EditorService {
  private readonly STORAGE_KEY = 'done-lines';
  private platformId = inject(PLATFORM_ID);
  editor: Editor | null = null;

  init(element: HTMLElement): void {
    this.editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Underline,
        TaskList,
        TaskItem.configure({ nested: true }),
      ],
      content: this.loadFromStorage(),
      onUpdate: ({ editor }) => {
        localStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(editor.getJSON()),
        );
      },
    });
  }

  destroy(): void {
    this.editor?.destroy();
    this.editor = null;
  }

  private loadFromStorage(): object | string {
    if (!isPlatformBrowser(this.platformId)) return '<p></p>';
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return '<p></p>';
  }

  // --- Toolbar parancsok ---

  duplicate(): void {
    this.editor?.commands.duplicateNode(); // custom extension command
  }

  toggleCollapse(): void {
    this.editor?.commands.toggleCollapse(); // custom extension command
  }

  setCheckbox(
    type: 'default' | 'square' | 'list' | 'ordered' | 'none',
  ): void {
    if (!this.editor) return;
    const chain = this.editor.chain().focus();
    if (type === 'list') chain.toggleBulletList().run();
    else if (type === 'ordered') chain.toggleOrderedList().run();
    else if (type === 'default' || type === 'square') {
      this.editor.chain().focus().toggleTaskList().run();
    } else {
      if (!this.editor.chain().focus().liftListItem('listItem').run())
        this.editor.chain().focus().liftListItem('taskItem').run();
    }
  }
  cycleCheckboxType(): void {
    this.editor?.commands.cycleCheckboxType(); // custom extension command
  }
}
