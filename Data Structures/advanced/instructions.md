| Method       | Purpose                                         | Complexity |
| ------------ | ----------------------------------------------- | ---------- |
| `push(node)` | Insert a new element and maintain heap order    | O(log n)   |
| `pop()`      | Remove and return the root element              | O(log n)   |
| `heapify(i)` | Restore the heap property at a given node       | O(log n)   |
| `peek()`     | Inspect the root element without removing it    | O(1)       |
| `size()`     | Return the number of elements in the heap       | O(1)       |
| `isEmpty()`  | Check if the heap is empty                      | O(1)       |
| `swap(i, j)` | Exchange positions of two nodes                 | O(1)       |
| `parent(i)`  | Return the parent index of node at index i      | O(1)       |
| `left(i)`    | Return the left child index of node at index i  | O(1)       |
| `right(i)`   | Return the right child index of node at index i | O(1)       |

| Method                                          | Purpose                                       | Complexity |
| ----------------------------------------------- | --------------------------------------------- | ---------- |
| `enqueue(value, priority)`                      | Insert an item with an associated priority    | O(log n)   |
| `dequeue()`                                     | Remove & return the highest priority item     | O(log n)   |
| `peek()`                                        | Inspect highest priority item without removal | O(1)       |
| `changePriority(value, newPriority)` (optional) | Update the priority of an existing item       | O(log n)   |
| `isEmpty()` / `size()`                          | Queue status check & element count            | O(1)       |
