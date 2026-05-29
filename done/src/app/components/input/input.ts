import { Component, input, signal } from '@angular/core';
import { Label } from '../label/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixEyeCloseLine, remixEyeLine } from '@ng-icons/remixicon';

export type inputType = 'text' | 'password' | 'email' | 'textarea';

@Component({
  selector: 'app-input',
  imports: [Label, NgIcon],
  providers: [provideIcons({ remixEyeLine, remixEyeCloseLine })],
  templateUrl: './input.html',
  styles: ``,
})
export class Input {
  type = input<inputType>('text');
  required = input<boolean>(false);
  label = input.required<string>();
  placeholder = input<string>();
  class = input<string>();
  inputClass = input<string>();
  showPassword = signal<boolean>(false);

  generalClass =
    'hover:border-accent ring-accent/30 focus-within:ring-accent flex max-w-3xs items-center justify-between gap-2 rounded-xl border border-transparent bg-zinc-700 p-2 pl-4 duration-500 focus-within:ring-2 ';

  handleShow = () => {
    this.showPassword.set(!this.showPassword());
  };
}
