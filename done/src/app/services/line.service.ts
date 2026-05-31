import { effect, Injectable, signal } from '@angular/core';

export interface LineNodeData {
  id: string;
  content: string;
  collapsed: boolean;
  checkboxType: 'none' | 'default' | 'square';
  checked: boolean;
  children: LineNodeData[];
}

interface FindResult {
  node: LineNodeData;
  siblings: LineNodeData[];
  index: number;
  parentSiblings?: LineNodeData[];
  parentIndex?: number;
}

function findNode(
  nodes: LineNodeData[],
  id: string,
  parentSiblings?: LineNodeData[],
  parentIndex?: number,
): FindResult | null {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id)
      return {
        node: nodes[i],
        siblings: nodes,
        index: i,
        parentSiblings,
        parentIndex,
      };
    const found = findNode(nodes[i].children, id, nodes, i);
    if (found) return found;
  }
  return null;
}

function getFlatIds(nodes: LineNodeData[]): string[] {
  const result: string[] = [];
  for (const node of nodes) {
    result.push(node.id);
    if (!node.collapsed) result.push(...getFlatIds(node.children));
  }
  return result;
}

function isDescendant(
  nodes: LineNodeData[],
  ancestorId: string,
  nodeId: string,
): boolean {
  const result = findNode(nodes, ancestorId);
  if (!result) return false;
  return findNode(result.node.children, nodeId) !== null;
}

function setCheckedRecursive(
  node: LineNodeData,
  checked: boolean,
): void {
  node.checked = checked;
  node.children.forEach((child) =>
    setCheckedRecursive(child, checked),
  );
}

function cloneWithNewIds(node: LineNodeData): LineNodeData {
  return {
    ...node,
    id: crypto.randomUUID(),
    children: node.children.map(cloneWithNewIds),
  };
}

@Injectable({ providedIn: 'root' })
export class LineService {
  private readonly STORAGE_KEY = 'done-lines';
  nodes = signal<LineNodeData[]>(this.loadFromStorage());
  focusedId = signal<string | null>(null);

  constructor() {
    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.nodes()),
      );
    });
  }

  private loadFromStorage(): LineNodeData[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [this.createNode()];
  }

  createNode(content = ''): LineNodeData {
    return {
      id: crypto.randomUUID(),
      content,
      collapsed: false,
      checkboxType: 'none',
      checked: false,
      children: [],
    };
  }

  getPreviousId(id: string): string | null {
    const flat = getFlatIds(this.nodes());
    const idx = flat.indexOf(id);
    return idx > 0 ? flat[idx - 1] : null;
  }

  getNextId(id: string): string | null {
    const flat = getFlatIds(this.nodes());
    const idx = flat.indexOf(id);
    return idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
  }

  insertAfter(id: string): string {
    const newNode = this.createNode();
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result)
        result.siblings.splice(result.index + 1, 0, newNode);
      return tree;
    });
    return newNode.id;
  }

  deleteNode(id: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (
        result &&
        (result.siblings.length > 1 || result.parentSiblings)
      ) {
        result.siblings.splice(result.index, 1);
      }
      return tree;
    });
  }

  indent(id: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result && result.index > 0) {
        const prev = result.siblings[result.index - 1];
        result.siblings.splice(result.index, 1);
        prev.children.push(result.node);
        prev.collapsed = false;
      }
      return tree;
    });
  }

  outdent(id: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (
        result &&
        result.parentSiblings !== undefined &&
        result.parentIndex !== undefined
      ) {
        result.siblings.splice(result.index, 1);
        result.parentSiblings.splice(
          result.parentIndex + 1,
          0,
          result.node,
        );
      }
      return tree;
    });
  }

  duplicate(id: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result) {
        const clone = cloneWithNewIds(result.node);
        result.siblings.splice(result.index + 1, 0, clone);
      }
      return tree;
    });
  }

  updateContent(id: string, content: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result) result.node.content = content;
      return tree;
    });
  }

  toggleCollapse(id: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result) result.node.collapsed = !result.node.collapsed;
      return tree;
    });
  }

  toggleCheck(id: string): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result)
        setCheckedRecursive(result.node, !result.node.checked);
      return tree;
    });
  }

  setCheckbox(
    id: string,
    checkboxType: LineNodeData['checkboxType'],
  ): void {
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result) {
        result.node.checkboxType =
          result.node.checkboxType === checkboxType
            ? 'none'
            : checkboxType;
      }
      return tree;
    });
  }

  cycleCheckboxType(id: string): void {
    const types: LineNodeData['checkboxType'][] = [
      'none',
      'default',
      'square',
    ];
    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));
      const result = findNode(tree, id);
      if (result) {
        const idx = types.indexOf(result.node.checkboxType);
        result.node.checkboxType = types[(idx + 1) % types.length];
      }
      return tree;
    });
  }

  moveNode(
    sourceId: string,
    targetId: string,
    position: 'before' | 'after' | 'child',
  ): void {
    if (sourceId === targetId) return;
    if (isDescendant(this.nodes(), sourceId, targetId)) return;

    this.nodes.update((nodes) => {
      const tree: LineNodeData[] = JSON.parse(JSON.stringify(nodes));

      const sourceResult = findNode(tree, sourceId);
      if (!sourceResult) return tree;
      const [sourceNode] = sourceResult.siblings.splice(
        sourceResult.index,
        1,
      );

      const targetResult = findNode(tree, targetId);
      if (!targetResult) return tree;

      if (position === 'before') {
        targetResult.siblings.splice(
          targetResult.index,
          0,
          sourceNode,
        );
      } else if (position === 'after') {
        targetResult.siblings.splice(
          targetResult.index + 1,
          0,
          sourceNode,
        );
      } else {
        targetResult.node.children.push(sourceNode);
        targetResult.node.collapsed = false;
      }

      return tree;
    });
  }
}
