import { Hashable } from '../hash/hashable'

export enum CardNodeType {
  node = 'node',
  predicate = 'predicate'
}

export class CardNode implements Hashable {
  readonly id: string;
  readonly label: string;
  readonly nodeType: CardNodeType;

  constructor(id: string, label: string, nodeType: CardNodeType = CardNodeType.node) {
    this.id = id;
    this.label = label;
    this.nodeType = nodeType ? nodeType : CardNodeType.node;
  }

  get hashKey(): string {
    return `Vertex(${this.id})`
  }

  equals(other: Object): boolean {
    return other instanceof CardNode && this.id === other.id
  }
}
