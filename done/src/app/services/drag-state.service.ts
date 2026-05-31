import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragStateService {
  draggedId = signal<string | null>(null);
}
