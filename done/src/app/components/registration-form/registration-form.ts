import { Component } from '@angular/core';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';

@Component({
  selector: 'app-registration-form',
  imports: [Input, Checkbox, Button],
  templateUrl: './registration-form.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class RegistrationForm {}
