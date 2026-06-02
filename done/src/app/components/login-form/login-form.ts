import { Component } from '@angular/core';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';

@Component({
  selector: 'app-login-form',
  imports: [Input, Checkbox, Button],
  templateUrl: './login-form.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class LoginForm {}
