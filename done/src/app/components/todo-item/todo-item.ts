import { Component, input, output } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [Checkbox],
  templateUrl: './todo-item.html',
})
export class TodoItem {
  todo = input.required<Todo>();
  toggle = output<number>();
}
