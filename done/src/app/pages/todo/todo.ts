import { Component } from '@angular/core';
import { Container } from '../../components/container/container';
import { TodoHeader } from '../../components/todo-header/todo-header';
import { TodoItem } from "../../components/todo-item/todo-item";

@Component({
  selector: 'app-todo',
  imports: [Container, TodoHeader, TodoItem],
  templateUrl: './todo.html',
  styles: ``,
})
export class Todo {}
