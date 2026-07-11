import { Component, model } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import { NgIcon } from '@ng-icons/core';
import { DatePicker } from 'primeng/datepicker';
import { Popover } from 'primeng/popover';
import { FormsModule } from '@angular/forms';
import { Options, optionsItemType } from '../options/options';
import { Button } from '../button/button';
import { Datepicker } from '../datepicker/datepicker';

@Component({
  selector: 'app-todo-item',
  imports: [
    Checkbox,
    NgIcon,
    DatePicker,
    Popover,
    FormsModule,
    Options,
    Button,
    Datepicker,
  ],
  templateUrl: './todo-item.html',
  styles: ``,
})
export class TodoItem {
  checked = model<boolean>(false);
  items: optionsItemType[] = [
    { label: 'Delete', data: { icon: 'remixDeleteBinLine' } },
  ];
}
