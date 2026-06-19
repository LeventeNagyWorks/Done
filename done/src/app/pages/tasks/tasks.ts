import { Component, inject } from '@angular/core';
import { Container } from '../../components/container/container';
import { LineNode } from '../../components/texteditor/line-node/line-node';
import {
  LineNodeData,
  LineService,
} from '../../services/line.service';
import { Toolbar } from '../../components/texteditor/toolbar/toolbar';
import { DocumentMenu } from "../../components/document-menu/document-menu";

@Component({
  selector: 'app-tasks',
  imports: [Container, LineNode, Toolbar, DocumentMenu],
  templateUrl: './tasks.html',
})
export class Tasks {
  lineService = inject(LineService);

  getOrderedNum(siblings: LineNodeData[], index: number): number {
    return siblings
      .slice(0, index + 1)
      .filter((n) => n.checkboxType === 'ordered').length;
  }
}
