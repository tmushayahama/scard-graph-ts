import { HashSet } from '../../../src/hash/hashset'
import { CardNode, CardNodeType } from '../../../src/card-triple-graph/card-node'
import { CardTriple } from '../../../src/card-triple-graph/card-triple'
import { CardGraph } from '../../../src/card-triple-graph/card-graph'

describe('CardGraph', () => {
    let n1: CardNode;
    let n2: CardNode;
    let n3: CardNode;
    let n4: CardNode;
    let p1: CardNode;
    let t1: CardTriple<CardNode>;
    let t2: CardTriple<CardNode>;
    let t3: CardTriple<CardNode>;
    let graph: CardGraph<CardNode, CardTriple<CardNode>>

    beforeEach(() => {
        n1 = new CardNode('n1', 'n1-label')
        n2 = new CardNode('n2', 'n2-label')
        n3 = new CardNode('n3', 'n3-label')
        n4 = new CardNode('n4', 'n4-label')
        p1 = new CardNode('p1', 'p1-label', CardNodeType.predicate)
        t1 = new CardTriple(n1, p1, n2)
        t2 = new CardTriple(n2, p1, n4)
        t3 = new CardTriple(n3, p1, n4)
        graph = new CardGraph<CardNode, CardTriple<CardNode>>()
    })

    describe('.root node', () => {

        describe('root node', () => {
            beforeEach(() => {
                graph.addNodes([n1, n2, n3, n4, p1])
                graph.addTriples([t1, t2, t3]);
            })

            it('should return 2 nodes', () => {
                expect(graph.getRootNodes().length).toEqual(2)
            })

        })


    })

    describe('.add node', () => {

        describe('add node', () => {
            beforeEach(() => {
                graph.addNodes([n1, n2, n3, n4, p1])
                graph.addTriples([t1, t2, t3]);
            })

            it('should return n2 node', () => {
                expect(graph.getNode('n2')).toEqual(n2)
            })

            it('should return n3 node label', () => {
                expect(graph.getNode('n3').label).toEqual('n3-label')
            })
        })


    })
});
