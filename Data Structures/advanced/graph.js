// ============================================================
//  GRAPH - Adjacency List Implementation
//  Supports directed and undirected graphs
//  Includes DFS and BFS traversal algorithms
// ============================================================

class Graph {
  constructor(directed = false) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);

    if (!this.adjacencyList.get(v1).includes(v2)) {
      this.adjacencyList.get(v1).push(v2);
    }

    if (!this.directed && !this.adjacencyList.get(v2).includes(v1)) {
      this.adjacencyList.get(v2).push(v1);
    }
  }

  removeEdge(v1, v2) {
    if (this.adjacencyList.has(v1)) {
      this.adjacencyList.set(
        v1,
        this.adjacencyList.get(v1).filter((v) => v !== v2)
      );
    }

    if (!this.directed && this.adjacencyList.has(v2)) {
      this.adjacencyList.set(
        v2,
        this.adjacencyList.get(v2).filter((v) => v !== v1)
      );
    }
  }

  hasEdge(v1, v2) {
    return this.adjacencyList.has(v1) && this.adjacencyList.get(v1).includes(v2);
  }

  printGraph() {
    console.log(`\nGraph (${this.directed ? "directed" : "undirected"}):`);
    for (const [vertex, neighbors] of this.adjacencyList) {
      console.log(`  ${vertex} -> [${neighbors.join(", ")}]`);
    }
  }

  // Depth-First Search (recursive)
  dfs(start) {
    const visited = new Set();
    const result = [];

    const traverse = (vertex) => {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    };

    traverse(start);
    return result;
  }

  // Breadth-First Search
  bfs(start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

// ============================================================
//  TESTS
// ============================================================

// --- Undirected graph ---
console.log("=== Undirected Graph ===");
const undirected = new Graph(false);
undirected.addEdge("A", "B");
undirected.addEdge("A", "C");
undirected.addEdge("B", "D");
undirected.addEdge("C", "D");
undirected.addEdge("D", "E");

undirected.printGraph();
console.log("DFS from A:", undirected.dfs("A").join(" -> "));
console.log("BFS from A:", undirected.bfs("A").join(" -> "));

console.log("\nHas edge A-B?", undirected.hasEdge("A", "B"));
console.log("Has edge A-E?", undirected.hasEdge("A", "E"));

undirected.removeEdge("A", "B");
console.log("\nAfter removing edge A-B:");
undirected.printGraph();

// --- Directed graph ---
console.log("\n=== Directed Graph ===");
const directed = new Graph(true);
directed.addEdge("A", "B");
directed.addEdge("A", "C");
directed.addEdge("B", "D");
directed.addEdge("C", "D");
directed.addEdge("D", "E");

directed.printGraph();
console.log("DFS from A:", directed.dfs("A").join(" -> "));
console.log("BFS from A:", directed.bfs("A").join(" -> "));
