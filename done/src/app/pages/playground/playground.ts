import { Component, inject } from '@angular/core';
import { Checkbox } from '../../components/checkbox/checkbox';
import { Button } from '../../components/button/button';
import { Dropdown, DropdownOption } from '../../components/dropdown/dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playground',
  imports: [Checkbox, Button, Dropdown],
  templateUrl: './playground.html',
})
export class Playground {
  private router = inject(Router);

  options: DropdownOption[] = [
    { label: 'Button', onClick: () => this.router.navigate(['/playground/button']) },
    { label: 'Checkbox', onClick: () => this.router.navigate(['/playground/checkbox']) },
    { label: 'Dropdown', onClick: () => this.router.navigate(['/playground/dropdown']) },
  ];
}
