import { Component, input } from '@angular/core';
import { Button } from "../button/button";

@Component({
  selector: 'app-todo-header',
  imports: [Button],
  templateUrl: './todo-header.html',
  styles: ``,
})
export class TodoHeader {
  name = input.required<string>();
}
