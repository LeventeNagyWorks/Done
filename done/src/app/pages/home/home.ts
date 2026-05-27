import { Component, effect, OnInit, signal } from '@angular/core';
import { TodoItem } from '../../components/todo-item/todo-item';
import { Button } from '../../components/button/button';
import { Todo } from '../../models/todo.model';

const STORAGE_KEY = 'todos';

const DEFAULT_TODOS: Todo[] = [
  {
    id: 1,
    todo: 'Vásárlás',
    description: 'Tej, kenyér, tojás',
    checked: false,
    createdAt: new Date('2026-05-20'),
    deadline: new Date('2026-05-26'),
  },
  {
    id: 2,
    todo: 'Angular projekt befejezése',
    description: 'Todo app komponensek elkészítése',
    checked: true,
    createdAt: new Date('2026-05-18'),
    deadline: new Date('2026-05-25'),
  },
  {
    id: 3,
    todo: 'Edzés',
    description: 'Heti 3x edzés',
    checked: false,
    createdAt: new Date('2026-05-21'),
    deadline: new Date('2026-05-28'),
  },
];

@Component({
  selector: 'app-home',
  imports: [TodoItem, Button],
  templateUrl: './home.html',
})
export class Home {
  todos = signal<Todo[]>(this.loadTodos());

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
    });
  }

  private loadTodos(): Todo[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((t: Todo) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        deadline: new Date(t.deadline),
      }));
    }
    return DEFAULT_TODOS;
  }

  toggleTodo(id: number) {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)),
    );
  }
}
