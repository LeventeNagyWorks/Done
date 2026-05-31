import { Component, inject } from '@angular/core';
import { Container } from '../../components/container/container';
import { LineNode } from '../../components/texteditor/line-node/line-node';
import { LineService } from '../../services/line.service';
import { Toolbar } from '../../components/texteditor/toolbar/toolbar';

@Component({
  selector: 'app-tasks',
  imports: [Container, LineNode, Toolbar],
  templateUrl: './tasks.html',
})
export class Tasks {
  lineService = inject(LineService);
}
