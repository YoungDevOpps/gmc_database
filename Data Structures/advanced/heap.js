class Heap {
    // ===== Step 1 : The Structure =====
    constructor(compare = (a, b) => a < b) {
        this.heap = []; // the heap is stored in an array, the root is at index 0
        this.compare = compare; // callback to compare two nodes
    }

    // ===== Step 2 : Navigation =====
    parent(i) { return Math.floor((i - 1) / 2); } // to get the parent of a node
    left(i) { return 2 * i + 1; } // to get the left child of a node
    right(i) { return 2 * i + 2; } // to get the right child of a node

    // ===== Step 3 : utilities =====
    size() { return this.heap.length; } // to get the size of the heap
    isEmpty() { return this.heap.length === 0; } // to check if the heap is empty
    peek() { return this.isEmpty() ? null : this.heap[0]; } // to get the root element without removing it
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; // to swap two nodes
    }

    // ===== Step 4 : insertion =====
    push(node) {
        this.heap.push(node);              // add to the end
        let i = this.heap.length - 1;      // position of the new element
        // while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
        while (i > 0 && this.compare(this.heap[i], this.heap[this.parent(i)])) {
            this.swap(i, this.parent(i));    // if the new element is smaller than its parent, it will bubble up
            i = this.parent(i);
        }
    }

    // ===== Step 5 : heapify (sift down) =====
    heapify(i) {
        let smallest = i;
        const l = this.left(i);
        const r = this.right(i);

        // if (l < this.size() && this.heap[l] < this.heap[smallest]) {
        if (l < this.size() && this.compare(this.heap[l], this.heap[smallest])) {
            smallest = l;
        }
        // if (r < this.size() && this.heap[r] < this.heap[smallest]) {
        if (r < this.size() && this.compare(this.heap[r], this.heap[smallest])) {
            smallest = r;
        }

        if (smallest !== i) {
            this.swap(i, smallest);
            this.heapify(smallest);
        }
    }

    // ===== Step 6 : pop (remove the root) =====
    pop() {
        if (this.isEmpty()) return null;

        const root = this.heap[0];
        const last = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapify(0);
        }

        return root;
    }
}

// ===== Priority Queue (uses the Heap internally) =====
class PriorityQueue {
    constructor() {
        // The queue uses a heap internally.
        // Items are compared by their priority only.
        // Smaller number = higher priority (1 comes before 3).
        this.heap = new Heap((a, b) => a.priority < b.priority);
    }

    // Insert an item with its priority - O(log n)
    enqueue(value, priority) {
        this.heap.push({ value, priority }); // wrap value + priority in one object
    }

    // Remove and return the highest priority item - O(log n)
    dequeue() {
        const node = this.heap.pop();               // the heap gives us its root
        return node === null ? null : node.value;   // return only the value
    }

    // Look at the highest priority item without removing it - O(1)
    peek() {
        const node = this.heap.peek();
        return node === null ? null : node.value;
    }

    // Number of items in the queue - O(1)
    size() {
        return this.heap.size();
    }

    // Check if the queue is empty - O(1)
    isEmpty() {
        return this.heap.isEmpty();
    }
}

// ===== Test =====
const tickets = new PriorityQueue();

tickets.enqueue("Imprimante bloquée", 3);
tickets.enqueue("Panne serveur", 1);
tickets.enqueue("Mot de passe oublié", 2);
tickets.enqueue("Souris cassée", 5);
tickets.enqueue("Messagerie lente", 4);

console.log(tickets.size());   // expected: 5
console.log(tickets.peek() + "\n--------");   // expected: Panne serveur

while (!tickets.isEmpty()) {
    console.log(tickets.dequeue());
}
// expected: Panne serveur, Mot de passe oublié, Imprimante bloquée, Messagerie lente, Souris cassée

console.log("--------\n" + tickets.dequeue()); // expected: null

// ===== Test =====
// const h = new Heap();
// [5, 3, 8, 1, 4].forEach(n => h.push(n));
// console.log(h.heap);   // expected: [1, 3, 8, 5, 4]
// console.log(h.peek()); // expected: 1

// const t = new Heap();
// t.heap = [9, 2, 5, 3, 4]; // 9 at the root: the heap rule is broken
// t.heapify(0);
// console.log(t.heap); // expected: [2, 3, 5, 9, 4]

// const p = new Heap();
// [5, 3, 8, 1, 4].forEach(n => p.push(n));

// console.log(p.pop());  // expected: 1
// console.log(p.heap);   // expected: [3, 4, 8, 5]
