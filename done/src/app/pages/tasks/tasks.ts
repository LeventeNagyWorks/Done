import { Component, signal } from '@angular/core';
import { Container } from '../../components/container/container';
import { TextEditor } from '../../components/texteditor/texteditor';

import { DocumentMenu } from '../../components/document-menu/document-menu';
import { Button } from '../../components/button/button';
import { EmojiPicker } from '../../components/emoji-picker/emoji-picker';
import { Toolbar } from '../../components/toolbar/toolbar';

@Component({
  imports: [
    Container,
    TextEditor,
    Toolbar,
    DocumentMenu,
    Button,
    EmojiPicker,
  ],
  templateUrl: './tasks.html',
})
export class Tasks {
  pageEmoji = signal('💵');
  sectionEmoji = signal('🗓️');
}
