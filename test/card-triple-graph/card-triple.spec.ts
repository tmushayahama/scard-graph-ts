import { CardNode } from "../../src/card-triple-graph/card-node"
import { CardTriple } from "../../src/card-triple-graph/card-triple"

describe('CardTriple', () => {
  let n1 = new CardNode('n1', 'n1-label')
  let n2 = new CardNode('n2', 'n2-label')
  let n3 = new CardNode('n3', 'n3-label')
  let p1 = new CardNode('p1', 'p1-label')
  let p2 = new CardNode('p2', 'p2-label')
  let t1: CardTriple<CardNode>
  let t2: CardTriple<CardNode>

  describe('.hashKey', () => {
    describe('when two edges have different source vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n3)
        t2 = new CardTriple(n2, p1, n3)
      })

      it('should not be equal', () => {
        expect(t1.hashKey).not.toEqual(t2.hashKey)
      })
    })

    describe('when two edges have different target vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n1, p1, n3)
      })

      it('should not be equal', () => {
        expect(t1.hashKey).not.toEqual(t2.hashKey)
      })
    })

    describe('when two vertices have the same source and target vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n1, p1, n2)
      })

      it('should be equal', () => {
        expect(t1.hashKey).toEqual(t2.hashKey)
      })
    })

    describe('when two vertices have inverted source and target vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n2, p1, n1)
      })

      it('should be false', () => {
        expect(t1.hashKey).not.toEqual(t2.hashKey)
      })
    })
  })

  describe('.equals', () => {
    describe('when two edges have different source vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n3)
        t2 = new CardTriple(n2, p1, n3)
      })

      it('should be false', () => {
        expect(t1.equals(t2)).toBe(false)
      })
    })

    describe('when two edges have different target vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n1, p1, n3)
      })

      it('should be false', () => {
        expect(t1.equals(t2)).toBe(false)
      })
    })

    describe('when two vertices have the same source and target vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n1, p1, n2)
      })

      it('should be true', () => {
        expect(t1.equals(t2)).toBe(true)
      })
    })

    describe('when two vertices have inverted source and target vertices', () => {
      beforeEach(() => {
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n2, p1, n1)
      })

      it('should be false', () => {
        expect(t1.equals(t2)).toBe(false)
      })
    })
  })

  describe('.reverse', () => {
    beforeEach(() => {
      t1 = new CardTriple(n1, p1, n2)
      t2 = new CardTriple(n2, p1, n1)
    })

    it('should swap the source and target vertices', () => {
      expect(t1.reverse().equals(t2)).toBe(true)
    })
  })

  describe('.getOppositeNode', () => {
    beforeEach(() => {
      t1 = new CardTriple(n1, p1, n2)
    })

    it('should return target when the argument is the source vertex', () => {
      expect(t1.getOppositeNode(n1)).toBe(t1.object)
    })

    it('should return source when the argument is the target vertex', () => {
      expect(t1.getOppositeNode(n2)).toBe(t1.subject)
    })

    it('should throw an error when the argument is neither the source nor the target vertex', () => {
      expect(() => t1.getOppositeNode(n3)).toThrow()
    })
  })
})
