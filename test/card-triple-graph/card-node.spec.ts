import { CardNode } from './../../src/card-triple-graph/card-node';

describe('CardNode', () => {
  let n1: CardNode
  let n2: CardNode

  describe('.hashKey', () => {
    describe('when two vertices have different ids', () => {
      beforeEach(() => {
        n1 = new CardNode('a', 'a')
        n2 = new CardNode('b', 'b')
      })

      it('should not be equal', () => {
        expect(n1.hashKey).not.toEqual(n2.hashKey)
      })
    })

    describe('when two vertices have the same ids', () => {
      beforeEach(() => {
        n1 = new CardNode('a', 'a')
        n2 = new CardNode('a', 'a')
      })

      it('should be equal', () => {
        expect(n1.hashKey).toEqual(n2.hashKey)
      })
    })
  })

  describe('.equals', () => {
    describe('when two vertices have different ids', () => {
      beforeEach(() => {
        n1 = new CardNode('a', 'a')
        n2 = new CardNode('b', 'b')
      })

      it('should be false', () => {
        expect(n1.equals(n2)).toBe(false)
      })
    })

    describe('when two vertices have the same ids', () => {
      beforeEach(() => {
        n1 = new CardNode('a', 'a')
        n2 = new CardNode('a', 'a')
      })

      it('should be true', () => {
        expect(n1.equals(n2)).toBe(true)
      })
    })
  })
})
