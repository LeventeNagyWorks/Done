import { Component, model } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import { NgIcon } from '@ng-icons/core';
import { DatePicker } from 'primeng/datepicker';
import { Popover } from 'primeng/popover';
import { FormsModule } from '@angular/forms';
import { Options } from '../options/options';

@Component({
  selector: 'app-todo-item',
  imports: [
    Checkbox,
    NgIcon,
    DatePicker,
    Popover,
    FormsModule,
    Options,
  ],
  templateUrl: './todo-item.html',
  styles: ``,
})
export class TodoItem {
  dueDate: Date | null = null;
  checked = model<boolean>(false);
}
