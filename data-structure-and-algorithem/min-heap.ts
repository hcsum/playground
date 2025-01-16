export class MinHeap {
  private heap: number[];

  constructor(private capacity: number) {
    this.heap = [];
  }

  insert(num: number): void {
    if (this.heap.length < this.capacity) {
      this.heap.push(num);
      this.heapifyUp();
    } else if (num > this.heap[0]) {
      this.heap[0] = num;
      this.heapifyDown();
    }
    console.log("heap", this.heap);
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const root = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return root;
  }

  size(): number {
    return this.heap.length;
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  private heapifyDown(): void {
    let index = 0;
    while (index < this.heap.length) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  // Return the minimum value without removing it
  peek() {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty");
    }
    return this.heap[0];
  }

  // Check if the heap is empty
  isEmpty() {
    return this.heap.length === 0;
  }
}

// Example usage
const minHeap = new MinHeap(10);
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(2);
minHeap.insert(8);

console.log(minHeap.extractMin()); // 2
console.log(minHeap.extractMin()); // 3
console.log(minHeap.peek()); // 5
