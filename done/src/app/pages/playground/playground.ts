import { Component, signal } from '@angular/core';
import { Checkbox } from '../../components/checkbox/checkbox';
import { Button } from '../../components/button/button';
import { Dropdown, DropdownOption } from '../../components/dropdown/dropdown';

@Component({
  selector: 'app-playground',
  imports: [Checkbox, Button, Dropdown],
  templateUrl: './playground.html',
})
export class Playground {
  selected = signal<DropdownOption | null>(null);

  options: DropdownOption[] = [{ label: 'Button' }, { label: 'Checkbox' }, { label: 'Dropdown' }];
}
