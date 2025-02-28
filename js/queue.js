class Queue {
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  enqueue(item) {
    // Reset and reorganize if we have too many dequeued items
    if (this.lowestCount > 1000) {
      this.reset();
    }
    this.items[this.count] = item;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  reset() {
    // Create new items object with reindexed values
    const newItems = {};
    for (let i = 0; i < this.size(); i++) {
      newItems[i] = this.items[i + this.lowestCount];
    }
    this.items = newItems;
    this.count = this.size();
    this.lowestCount = 0;
  }
}

// test case
const queue = new Queue();
queue.enqueue("John");
queue.enqueue("Jack");
queue.enqueue("Camila");
console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue.isEmpty());
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue.isEmpty());
console.log(queue.size());
queue.enqueue("Simona");
console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue.isEmpty());
console.log(queue.size());
console.log(queue.lowestCount);
console.log(queue.count);
