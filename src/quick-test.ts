import { CardNode, CardTriple, CardGraph } from ".";


function create() {
    let n1 = new CardNode('n1', 'n1-label')
    let n2 = new CardNode('n2', 'n2-label')
    let n3 = new CardNode('n3', 'n3-label')
    let n4 = new CardNode('n4', 'n4-label')
    let p1 = new CardNode('p1', 'p1-label')
    let t1 = new CardTriple(n1, p1, n2)
    let t2 = new CardTriple(n2, p1, n4)
    let t3 = new CardTriple(n3, p1, n4)
    let graph = new CardGraph<CardNode, CardTriple<CardNode>>()

    graph.addNodes([n1, n2, n3, n4])
    graph.addTriples([t1, t2, t3]);

    console.log(graph.getRootNodes());
}

create();


