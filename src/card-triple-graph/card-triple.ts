import { CardNode } from './card-node'
import { Hashable } from '../hash/hashable'

export class CardTriple<N extends CardNode> implements Hashable {
  readonly subject: N
  readonly predicate: N;
  readonly object: N
  weight: number

  constructor(subject: N, predicate: N, object: N, weight: number = 1) {
    this.subject = subject;
    this.predicate = predicate;
    this.object = object;
    this.weight = weight;
  }

  get hashKey(): string {
    return `CardTriple(${this.subject.hashKey},${this.predicate.hashKey}, ${this.object.hashKey}, ${this.weight})`
  }

  equals(other: Object): boolean {
    return (
      other instanceof CardTriple &&
      this.subject === other.subject &&
      this.object === other.object &&
      this.weight === other.weight
    )
  }

  reverse<E extends CardTriple<N>>(): E {
    return new CardTriple<N>(this.object, this.predicate, this.subject, this.weight) as E
  }

  getOppositeNode(v: N): N {
    if (this.subject.equals(v)) {
      return this.object
    } else if (this.object.equals(v)) {
      return this.subject
    } else {
      throw Error(`neither subject nor object node: ${v}`)
    }
  }
}

