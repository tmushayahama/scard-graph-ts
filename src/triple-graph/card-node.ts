import { Hashable } from '../hash/hashable'

export class CardNode implements Hashable {
  readonly id: string
  readonly label: string

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  get hashKey(): string {
    return `Vertex(${this.id})`
  }

  equals(other: Object): boolean {
    return other instanceof CardNode && this.id === other.id
  }
}
