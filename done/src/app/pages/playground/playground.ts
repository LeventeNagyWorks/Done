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
  selectedPlayground = signal<DropdownOption | null>(null);
  selectedTest = signal<DropdownOption | null>(null);

  playgroundOptions: DropdownOption[] = [
    { label: 'Button' },
    { label: 'Checkbox' },
    { label: 'Dropdown' },
  ];
  testOptions: DropdownOption[] = [
    { label: 'Avalon' },
    { label: 'Brexley' },
    { label: 'Corvyn' },
    { label: 'Dravik' },
    { label: 'Elspeth' },
    { label: 'Fenwick' },
    { label: 'Galdor' },
    { label: 'Harlyn' },
    { label: 'Isolde' },
  ];
}
