import {
  Component,
  model,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-emoji-picker',
  imports: [PickerComponent],
  templateUrl: './emoji-picker.html',
})
export class EmojiPicker {
  emoji = model<string>('😀');
  isOpen = signal(false);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  selectEmoji(event: any) {
    this.emoji.set(event.emoji.native);
    this.isOpen.set(false);
  }
}
