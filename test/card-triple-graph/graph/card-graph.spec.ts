
import { HashSet } from '../../../src/hash/hashset'
import { CardNode } from '../../../src/card-triple-graph/card-node'
import { CardTriple } from '../../../src/card-triple-graph/card-triple'
import { CardGraph } from '../../../src/card-triple-graph/card-graph'

describe('CardGraph', () => {
  let subject: CardNode;
  let object: CardNode;
  let predicate: CardNode;
  let t1: CardTriple<CardNode>;
  let t2: CardTriple<CardNode>;
  let graph: CardGraph<CardNode, CardTriple<CardNode>>;

  beforeEach(() => {
    subject = new CardNode('n1', 'n1-label')
    object = new CardNode('n2', 'n2-label')
    predicate = new CardNode('p1', 'p1-label')
    t1 = new CardTriple(subject, predicate, object)
    t2 = new CardTriple(object, predicate, subject)
    graph = new CardGraph<CardNode, CardTriple<CardNode>>()
  })

  describe('.containsNode', () => {
    describe('when the graph does not contain the node', () => {
      it('should return false', () => {
        expect(graph.containsNode(subject)).toBe(false)
      })
    })

    describe('when the graph does contain the node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return true', () => {
        expect(graph.containsNode(subject)).toEqual(true)
      })
    })
  })

  describe('.containsTriple', () => {
    describe('when the graph does not contain the triple', () => {
      it('should return false', () => {
        expect(graph.containsTriple(t1)).toBe(false)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return true', () => {
        expect(graph.containsTriple(t1)).toEqual(true)
      })
    })
  })

  describe('.getAllTriples', () => {
    describe('when the graph does not contain the source node', () => {
      beforeEach(() => {
        graph.addNode(object)
      })

      it('should return undefined', () => {
        expect(graph.getAllTriples(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return undefined', () => {
        expect(graph.getAllTriples(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph contains source and target but not the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return an empty hashset', () => {
        expect(graph.getAllTriples(subject, object)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return a hashset containing the triple', () => {
        expect(graph.getAllTriples(subject, object)).toEqual(new HashSet<CardTriple<CardNode>>([t1]))
      })
    })
  })

  describe('.getTriple', () => {
    describe('when the graph does not contain the source node', () => {
      beforeEach(() => {
        graph.addNode(object)
      })

      it('should return undefined', () => {
        expect(graph.getTriple(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return undefined', () => {
        expect(graph.getTriple(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does contain source and target but not the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return undefined', () => {
        expect(graph.getTriple(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return the triple', () => {
        expect(graph.getTriple(subject, object)).toBe(t1)
      })
    })
  })

  describe('.addTriple', () => {
    describe('when the graph does not contain the source node', () => {
      beforeEach(() => {
        graph.addNode(object)
      })

      it('should throw an error', () => {
        expect(() => graph.addTriple(t1)).toThrow()
      })
    })

    describe('when the graph does not contain the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should throw an error', () => {
        expect(() => graph.addTriple(t1)).toThrow()
      })
    })

    describe('when the graph does contain the source and the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return true', () => {
        expect(graph.addTriple(t1)).toEqual(true)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return false', () => {
        expect(graph.addTriple(t1)).toEqual(false)
      })
    })
  })

  describe('.addNode', () => {
    describe('when the graph does not contain the node', () => {
      it('should return true', () => {
        expect(graph.addNode(subject)).toBe(true)
      })
    })

    describe('when the graph does contain the node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return false', () => {
        expect(graph.addNode(subject)).toEqual(false)
      })
    })
  })

  describe('.tripleSet', () => {
    describe('when the graph does not contain the triple', () => {
      it('should return an empty hashset', () => {
        expect(graph.tripleSet()).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return a hashset containing the triple', () => {
        expect(graph.tripleSet()).toEqual(new HashSet<CardTriple<CardNode>>([t1]))
      })
    })
  })

  describe('.nodeSet', () => {
    describe('when the graph does not contain the node', () => {
      it('should return an empty hashset', () => {
        expect(graph.nodeSet()).toEqual(new HashSet<CardNode>())
      })
    })

    describe('when the graph does contain the node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return a hashset containing the triple', () => {
        expect(graph.nodeSet()).toEqual(new HashSet<CardNode>([subject]))
      })
    })
  })

  describe('.incomingTriplesOf', () => {
    describe('when the graph does not contain the node', () => {
      it('should return an empty hashset', () => {
        expect(graph.incomingTriplesOf(subject)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the node but no triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return an empty hashset', () => {
        expect(graph.incomingTriplesOf(subject)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain an triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return an empty hashset for the source of the triple', () => {
        expect(graph.incomingTriplesOf(subject)).toEqual(HashSet.EMPTY)
      })

      it('should return a hashset containing the triple for the target of the triple', () => {
        expect(graph.incomingTriplesOf(object)).toEqual(new HashSet<CardTriple<CardNode>>([t1]))
      })
    })
  })

  describe('.inDegreeOf', () => {
    describe('when the graph does not contain the node', () => {
      it('should return zero', () => {
        expect(graph.inDegreeOf(subject)).toBe(0)
      })
    })

    describe('when the graph does contain the node but no triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return zero', () => {
        expect(graph.inDegreeOf(subject)).toBe(0)
      })
    })

    describe('when the graph does contain an triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return zero for the source of the triple', () => {
        expect(graph.inDegreeOf(subject)).toBe(0)
      })

      it('should return one for the target of the triple', () => {
        expect(graph.inDegreeOf(object)).toBe(1)
      })
    })
  })

  describe('.outgoingTriplesOf', () => {
    describe('when the graph does not contain the node', () => {
      it('should return an empty hashset', () => {
        expect(graph.outgoingTriplesOf(subject)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the node but no triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return an empty hashset', () => {
        expect(graph.outgoingTriplesOf(subject)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain an triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return a hashset containing the triple for the source of the triple', () => {
        expect(graph.outgoingTriplesOf(subject)).toEqual(new HashSet<CardTriple<CardNode>>([t1]))
      })

      it('should return an empty hashset for the target of the triple', () => {
        expect(graph.outgoingTriplesOf(object)).toEqual(HashSet.EMPTY)
      })
    })
  })

  describe('.outDegreeOf', () => {
    describe('when the graph does not contain the node', () => {
      it('should return zero', () => {
        expect(graph.outDegreeOf(subject)).toBe(0)
      })
    })

    describe('when the graph does contain the node but no triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return zero', () => {
        expect(graph.outDegreeOf(subject)).toBe(0)
      })
    })

    describe('when the graph does contain an triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return one for the source of the triple', () => {
        expect(graph.outDegreeOf(subject)).toBe(1)
      })

      it('should return zero for the target of the triple', () => {
        expect(graph.outDegreeOf(object)).toBe(0)
      })
    })
  })

  describe('.removeTripleBetween', () => {
    describe('when the graph does not contain the source node', () => {
      beforeEach(() => {
        graph.addNode(object)
      })

      it('should return undefined', () => {
        expect(graph.removeTripleBetween(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return undefined', () => {
        expect(graph.removeTripleBetween(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does contain source and target but not the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return undefined', () => {
        expect(graph.removeTripleBetween(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return the triple', () => {
        expect(graph.removeTripleBetween(subject, object)).toBe(t1)
      })
    })
  })

  describe('.removeTriple', () => {
    describe('when the graph does not contain the source node', () => {
      beforeEach(() => {
        graph.addNode(object)
      })

      it('should return false', () => {
        expect(graph.removeTriple(t1)).toBe(false)
      })
    })

    describe('when the graph does not contain the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return false', () => {
        expect(graph.removeTriple(t1)).toBe(false)
      })
    })

    describe('when the graph does contain source and target but not the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return false', () => {
        expect(graph.removeTriple(t1)).toBe(false)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return the triple', () => {
        expect(graph.removeTriple(t1)).toBe(true)
      })
    })
  })

  describe('.removeNode', () => {
    describe('when the graph does not contain the node', () => {
      it('should return false', () => {
        expect(graph.removeNode(subject)).toBe(false)
      })
    })

    describe('when the graph does contain the node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return true', () => {
        expect(graph.removeNode(subject)).toBe(true)
      })
    })
  })

  describe('.removeAllTriples', () => {
    describe('when the graph does not contain an triple', () => {
      it('should return false', () => {
        expect(graph.removeAllTriples([t1])).toBe(false)
      })
    })

    describe('when the graph does contain an triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return true', () => {
        expect(graph.removeAllTriples([t1])).toBe(true)
      })
    })
  })

  describe('.removeAllTriplesBetween', () => {
    describe('when the graph does not contain the source node', () => {
      beforeEach(() => {
        graph.addNode(object)
      })

      it('should return undefined', () => {
        expect(graph.removeAllTriplesBetween(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does not contain the target node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return undefined', () => {
        expect(graph.removeAllTriplesBetween(subject, object)).toBe(undefined)
      })
    })

    describe('when the graph does contain source and target but not the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return an empty hashset', () => {
        expect(graph.removeAllTriplesBetween(subject, object)).toEqual(HashSet.EMPTY)
      })
    })

    describe('when the graph does contain the triple', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
        graph.addTriple(t1)
      })

      it('should return a hashset containing the triple', () => {
        expect(graph.removeAllTriplesBetween(subject, object)).toEqual(
          new HashSet<CardTriple<CardNode>>([t1])
        )
      })
    })
  })

  describe('.removeAllNodes', () => {
    describe('when the graph does not contain a node', () => {
      it('should return false', () => {
        expect(graph.removeAllNodes([subject, object])).toBe(false)
      })
    })

    describe('when the graph does contain a node', () => {
      beforeEach(() => {
        graph.addNode(subject)
      })

      it('should return true', () => {
        expect(graph.removeAllNodes([subject, object])).toBe(true)
      })
    })

    describe('when the graph does contain both nodes', () => {
      beforeEach(() => {
        graph.addNode(subject)
        graph.addNode(object)
      })

      it('should return true', () => {
        expect(graph.removeAllNodes([subject, object])).toBe(true)
      })
    })
  })
})
