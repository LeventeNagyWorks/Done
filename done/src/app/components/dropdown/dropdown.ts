import {
  Component,
  computed,
  DOCUMENT,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowDownSLine } from '@ng-icons/remixicon';
import { fromEvent } from 'rxjs';
import { Label } from '../label/label';

export interface DropdownOption {
  label: string;
  onClick?: () => void;
}

@Component({
  selector: 'app-dropdown',
  imports: [NgIcon, Label],
  templateUrl: './dropdown.html',
  providers: [provideIcons({ remixArrowDownSLine })],
})
export class Dropdown {
  opened = signal<boolean>(false);
  options = input.required<DropdownOption[]>();
  selected = model<DropdownOption | null>(null);
  defaultOption = input<DropdownOption>();
  placeholder = input<string>();
  searchable = input<boolean>(false);
  searchTerm = signal<string>('');
  label = input<string>();

  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.options().filter((o) => o.label.toLowerCase().includes(term));
  });

  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);

  dropdownClass =
    'hover:border-accent ring-accent/30 focus-within:ring-accent relative flex max-w-3xs cursor-pointer items-center justify-between gap-2 rounded-xl border border-transparent bg-zinc-700 px-4 py-2 duration-500 focus-within:ring-2 hover:ring-3 ';

  constructor() {
    effect(() => {
      if (this.defaultOption() && this.selected() === null) {
        this.selected.set(this.defaultOption()!);
      }
    });

    fromEvent<MouseEvent>(this.document, 'click')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.opened.set(false);
        }
      });
  }

  handleOpen = () => {
    this.opened.set(!this.opened());
  };

  handleSelect = (option: DropdownOption) => {
    this.selected.set(option);
    this.opened.set(false);
  };
}
