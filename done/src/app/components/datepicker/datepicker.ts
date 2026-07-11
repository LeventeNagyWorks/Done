import { Component, ViewEncapsulation } from '@angular/core';
import { Button } from '../button/button';
import { Popover } from 'primeng/popover';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  imports: [Button, Popover, DatePicker, FormsModule, DatePipe],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
})
export class Datepicker {
  dueDate: Date | null = null;
}
