import { Component, input, signal } from '@angular/core';
import { Label } from '../label/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixEyeCloseLine, remixEyeLine } from '@ng-icons/remixicon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

export type inputType = 'text' | 'password' | 'email' | 'textarea';

@Component({
  selector: 'app-input',
  imports: [Label, NgIcon, InputTextModule, FloatLabelModule],
  providers: [provideIcons({ remixEyeLine, remixEyeCloseLine })],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  label = input.required<string>();
  id = input.required<string>();
  type = input<inputType>('text');
  required = input<boolean>(false);
  placeholder = input<string>();
  class = input<string>();
  inputClass = input<string>();
  showPassword = signal<boolean>(false);
}
