import { Hashable } from '../hash/hashable'

export enum NodeType {
  node = 'node',
  predicate = 'predicate'
}

export class CardNode implements Hashable {
  readonly id: string;
  readonly label: string;
  readonly nodeType: NodeType;

  constructor(id: string, label: string, nodeType: NodeType = NodeType.node) {
    this.id = id;
    this.label = label;
    this.nodeType = nodeType ? nodeType : NodeType.node;
  }

  get hashKey(): string {
    return `Vertex(${this.id})`
  }

  equals(other: Object): boolean {
    return other instanceof CardNode && this.id === other.id
  }
}
