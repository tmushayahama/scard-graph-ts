import { HashMap } from '../hash/hashmap'
import { HashSet } from '../hash/hashset'
import { CardNode, NodeType } from './card-node'
import { CardTriple } from './card-triple'

/**
 * A graph <tt>G(V,E)</tt> contains a set <tt>V</tt> of nodes and a set <tt>E</tt> of triples.
 *
 * @class Graph
 * @template N the graph node type.
 * @template T the graph triple type.
 */
export class CardGraph<N extends CardNode, T extends CardTriple<N>> {

  protected readonly map = new HashMap<N, HashSet<T>>()

  /**
   * Internal representation of the edge set.
   *
   * @protected
   * @memberof Graph
   */
  protected readonly triples = new HashSet<T>();

  protected readonly predicates = new HashSet<T>();

  tripleMatrix: any = {};

  constructor() { }

  addNode(node: N): boolean {
    const contained = this.containsNode(node);

    if (!contained) {
      this.map.set(node, new HashSet<T>())
    }
    return !contained
  }

  getNode(id: String): N | undefined {
    let result;
    this.nodeSet().forEach(subject => {
      if (subject.id === id) {
        result = subject;
        return;
      }

    })

    return result;
  }

  /**
   * Adds multiple nodes to the graph.
   *
   * @param {N[]} nodes the nodes to be added to this graph.
   * @returns {boolean} <tt>true</tt> if this graph was modified as result of the call.
   * @memberof Graph
   */
  addNodes(nodes: N[]): boolean {
    let modified = false
    for (const node of nodes) {
      modified = this.addNode(node) || modified
    }
    return modified
  }

  addTriple(triple: T): boolean {
    if (!this.containsNode(triple.subject)) {
      throw Error('subject of triple not found in graph')
    }

    if (!this.containsNode(triple.predicate)) {
      throw Error('predicate of triple not found in graph')
    }

    if (!this.containsNode(triple.object)) {
      throw Error('object of triple not found in graph')
    }

    if (!this.tripleMatrix[triple.subject]) {
      this.tripleMatrix[triple.subject] = {};
    }

    if (!this.tripleMatrix[triple.subject][triple.object]) {
      this.tripleMatrix[triple.subject][triple.object] = {};
    }

    const contained = this.containsTriple(triple)

    if (!contained) {
      this.tripleMatrix[triple.subject][triple.object] = triple.predicate;

      this.map.get(triple.subject)!.add(triple)
      this.triples.add(triple)
    }

    return !contained;
  }


  /**
   * Adds multiple triples to the graph.
   *
   * @param {T[]} triples the triples to be added to this graph.
   * @returns {boolean} <tt>true</tt> if this graph was modified as result of the call.
   * @memberof Graph
   */
  addTriples(triples: T[]): boolean {
    let modified = false
    for (const triple of triples) {
      modified = this.addTriple(triple) || modified
    }
    return modified
  }

  addTripleByIds(s: string, p: string, o: string) {
    const subject = this.getNode(s) as N;
    const predicate = this.getNode(p) as N;
    const object = this.getNode(o) as N;

    this.addTriple(new CardTriple<N>(subject, predicate, object) as T)
  }

  /**
   * Returns a set of the nodes contained in this graph.
   *
   * @returns {HashSet<N>} a set of the nodes contained in this graph.
   * @memberof Graph
   */
  nodeSet(): HashSet<N> {
    return new HashSet(this.map.keys())
  }

  /**
   * Returns a set of the triples contained in this graph.
   *
   * @returns {HashSet<T>} a set of the triples contained in this graph.
   * @memberof Graph
   */
  tripleSet(): HashSet<T> {
    return new HashSet(this.triples.values())
  }

  /**
   * Returns an triple connecting subject node to object node if such nodes and such triple
   * exist in this graph. Otherwise returns <code>undefined</code>. If any of the specified
   * nodes is <code>undefined</code> returns <code>undefined</code>.
   *
   * @param {N} subject the subject node of the triple.
   * @param {N} object the object node of the triple.
   * @returns {T} an triple connecting subject node to object node.
   * @memberof Graph
   */
  getTriple(subject: N, object: N): T | undefined {
    for (const triple of this.outgoingTriplesOf(subject)) {
      if (triple.object.equals(object)) {
        return triple
      }
    }
    return undefined
  }

  /**
   * Returns <tt>true</tt> if this graph contains the specified node. More formally, returns
   * <tt>true</tt> if and only if this graph contains a node <code>u</code> such that
   * <code>u.equals(v)</code>.
   *
   * @param {N} v the node whose presence in this graph is to be tested.
   * @returns {boolean} <tt>true</tt> if this graph contains the specified node.
   * @memberof Graph
   */
  containsNode(node: N): boolean {
    return this.map.has(node)
  }

  /**
   * Returns <tt>true</tt> if this graph contains the specified triple. More formally, returns
   * <tt>true</tt> if and only if this graph contains an triple <code>e2</code> such that
   * <code>e.equals(e2)</code>.
   *
   * @param {T} e the triple whose presence in this graph is to be tested.
   * @returns {boolean} <tt>true</tt> if this graph contains the specified triple.
   * @memberof Graph
   */
  containsTriple(triple: T): boolean {
    return this.triples.has(triple)
  }

  /**
   * Returns a set of all triples connecting subject node to object node if such nodes exist
   * in this graph. If any of the nodes does not exist or is <code>undefined</code>, returns
   * <code>undefined</code>. If both nodes exist but no triples found, returns an empty set.
   *
   * @param {N} subject the subject node of the triple.
   * @param {N} object the object node of the triple.
   * @returns {HashSet<T>} a hashset of all triples connecting subject node to object node.
   * @memberof Graph
   */
  getAllTriples(subject: N, object: N): HashSet<T> | undefined {
    if (this.containsNode(subject) && this.containsNode(object)) {
      const triples = new HashSet<T>()
      for (const triple of this.outgoingTriplesOf(subject)) {
        if (triple.object.equals(object)) {
          triples.add(triple)
        }
      }
      return triples
    }
    return undefined
  }


  /**
   * Returns a set of all triples touching the specified node. If no triples are touching the
   * specified node returns an empty set.
   *
   * @param {N} node the node for which a set of touching triples is to be returned.
   * @returns {HashSet<T>} a hashset of all triples touching the specified node.
   * @memberof Graph
   */
  triplesOf(node: N): HashSet<T> {
    const triples = new HashSet<T>()
    for (const outgoing of this.map.values()) {
      for (const triple of outgoing) {
        if (triple.subject.equals(node) || triple.object.equals(node)) {
          triples.add(triple)
        }
      }
    }
    return triples
  }

  /**
   * Returns the degree of the specified node.
   *
   * @param {N} node the node whose degree is to be calculated.
   * @returns {number} the degree of the specified node.
   * @memberof Graph
   */
  degreeOf(node: N): number {
    return this.triplesOf(node).size
  }

  /**
   * Returns a set of all triples incoming into the specified node.
   *
   * @param {N} node the node for which the set of incoming triples to be returned.
   * @returns {HashSet<T>} a hashset of all triples incoming into the specified node.
   * @memberof Graph
   */
  incomingTriplesOf(node: N): HashSet<T> {
    const triples = new HashSet<T>()

    for (const outgoing of this.map.values()) {
      for (const triple of outgoing) {
        if (triple.object.equals(node)) {
          triples.add(triple)
        }
      }
    }
    return triples
  }

  /**
   * Returns the the number of inward directed triples from the specified node.
   *
   * @param {N} node the node whose degree is to be calculated.
   * @returns {number} the "in-degree" of the specified node.
   * @memberof Graph
   */
  inDegreeOf(node: N): number {
    return this.incomingTriplesOf(node).size
  }

  /**
   * Returns a set of all triples outgoing from the specified node.
   *
   * @param {N} node the node for which the set of outgoing triples to be returned.
   * @returns {HashSet<T>} a hashset of all triples outgoing from the specified node.
   * @memberof Graph
   */
  outgoingTriplesOf(node: N): HashSet<T> {
    return new HashSet<T>(this.map.get(node))
  }

  /**
   * Returns the number of outward directed triples from the specified node.
   *
   * @param {N} node the node whose degree is to be calculated.
   * @returns {number} the "out-degree" of the specified node.
   * @memberof Graph
   */
  outDegreeOf(node: N): number {
    return this.outgoingTriplesOf(node).size
  }

  /**
   * Removes an triple going from subject node to object node, if such nodes and such triple
   * exist in this graph. Returns the triple if removed or <code>undefined</code> otherwise.
   *
   * @param {N} subject the subject node of the triple.
   * @param {N} object the object node of the triple.
   * @returns {T} the removed triple, or <code>undefined</code> if no triple removed.
   * @memberof Graph
   */
  removeTripleBetween(subject: N, object: N): T | undefined {
    for (const triple of this.outgoingTriplesOf(subject)) {
      if (triple.object.equals(object)) {
        this.map.get(subject)!.delete(triple)
        this.triples.delete(triple)
        return triple
      }
    }
    return undefined
  }

  /**
   * Removes the specified triple from the graph. Removes the specified triple from this graph if it
   * is present. More formally, removes an triple <code>e2</code> such that <code>e2.equals(e)</code>,
   * if the graph contains such triple. Returns <tt>true</tt> if the graph contained the specified
   * triple.
   *
   * @param {T} triple the triple to be removed from this graph, if present.
   * @returns {boolean} <code>true</code> if and only if the graph contained the specified triple.
   * @memberof Graph
   */
  removeTriple(triple: T): boolean {
    return this.removeTripleBetween(triple.subject, triple.object) !== undefined
  }

  /**
   * Removes the specified node from this graph including all its touching triples if present.
   * More formally, if the graph contains a node <code>u</code> such that <code>u.equals(v)</code>,
   * the call removes all triples that touch <code>u</code> and then removes <code>u</code> itself.
   * If no such <code>u</code> is found, the call leaves the graph unchanged. Returns <tt>true</tt>
   * if the graph contained the specified node.
   *
   * @param {N} node the node to be removed from this graph, if present.
   * @returns {boolean} <code>true</code> if the graph contained the specified node.
   * @memberof Graph
   */
  removeNode(node: N): boolean {
    const contained = this.containsNode(node)
    if (contained) {
      // Remove the outgoing triples.
      this.map.delete(node)
      // Remove the incoming triples.
      this.nodeSet().forEach(subject => {
        this.removeTripleBetween(subject, node)
      })
    }
    return contained
  }

  /**
   * Removes all the triples in this graph that are also contained in the specified triple collection.
   * After this call returns, this graph will contain no triples in common with the specified triples.
   *
   * @param {T} triples the triples to be removed from this graph.
   * @returns {boolean} <tt>true</tt> if this graph changed as a result of the call.
   * @memberof Graph
   */
  removeAllTriples(triples: T[]): boolean {
    let changed = false
    for (const triple of triples) {
      if (this.removeTriple(triple)) {
        changed = true
      }
    }
    return changed
  }

  /**
   * Removes all the triples going from the specified subject node to the specified object node,
   * and returns a set of all removed triples. Returns <code>undefined</code> if any of the specified
   * nodes does not exist in the graph. If both nodes exist but no triple is found, returns an
   * empty set.
   *
   * @param {N} subject the subject node of the triple.
   * @param {N} object the object node of the triple.
   * @returns {HashSet<T>} the removed triples, or <code>undefined</code> if either node is not part
   *                       of the graph.
   * @memberof Graph
   */
  removeAllTriplesBetween(subject: N, object: N): HashSet<T> | undefined {
    let removedTriples = undefined
    if (this.containsNode(subject) && this.containsNode(object)) {
      removedTriples = new HashSet<T>()
      let triple = this.removeTripleBetween(subject, object)
      while (triple !== undefined) {
        removedTriples.add(triple)
        triple = this.removeTripleBetween(subject, object)
      }
    }
    return removedTriples
  }

  /**
   * Removes all the nodes in this graph that are also contained in the specified node
   * collection. After this call returns, this graph will contain no nodes in common with the
   * specified nodes.
   *
   * @param {N[]} nodes the nodes to be removed from this graph.
   * @returns {boolean} <tt>true</tt> if this graph changed as a result of the call
   * @memberof Graph
   */
  removeAllNodes(nodes: N[]): boolean {
    let changed = false
    for (const node of nodes) {
      changed = this.removeNode(node) || changed
    }
    return changed
  }

  /**
   * Removes all triples and nodes from the graph.
   *
   * @memberof Graph
   */
  clear(): void {
    this.map.clear()
    this.triples.clear()
  }

  getPredicate(subject: string, object: string) {
    if (this.tripleMatrix[subject] &&
      this.tripleMatrix[subject][object]) {

      return this.tripleMatrix[subject][object];
    }
    return null;
  };

  getRootNodes(): N[] {
    const self = this;
    const result: N[] = []

    self.map.forEach((value, node: N) => {
      if (self.inDegreeOf(node) === 0 && node.nodeType === NodeType.node) {
        result.push(node)
      }
    })
    return result;
  }
}
