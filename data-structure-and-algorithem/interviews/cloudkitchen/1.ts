// Part 1 Static File
// You are given a static log file containing billions of entries. Each entry contains a timestamp and the name of a food order. The entries in the log file appear in order of increasing timestamp. Design a method getCommon(k) to determine the k most common food orders found in the log file.

// 1595268625,Hamburger
// 1595268626,Salad
// 1595268627,HotDog
// 1595268628,Hamburger
// 1595268629,HotDog
// 1595268630,HotDog
// …

import * as fs from "fs";
import path from "path";
import * as readline from "readline";

interface FoodOrder {
  food: string;
  count: number;
}

class MinHeap {
  private heap: FoodOrder[];

  constructor(private capacity: number) {
    this.heap = [];
  }

  insert(order: FoodOrder): void {
    if (this.heap.length < this.capacity) {
      this.heap.push(order);
      this.heapifyUp();
    } else if (order.count > this.heap[0].count) {
      this.heap[0] = order;
      this.heapifyDown();
    }
    console.log("heap", this.heap);
  }

  extract(): FoodOrder | undefined {
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
      if (this.heap[parentIndex].count <= this.heap[index].count) break;
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
        this.heap[leftChild].count < this.heap[smallest].count
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].count < this.heap[smallest].count
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
}

async function getCommon(filePath: string, k: number): Promise<string[]> {
  const foodCount: Map<string, number> = new Map();
  const heap = new MinHeap(k);

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  // Count occurrences directly
  for await (const line of rl) {
    const [, food] = line.split(","); // Assuming log format: "timestamp,food"
    foodCount.set(food, (foodCount.get(food) || 0) + 1);
  }

  // Maintain top K in the heap
  for (const [food, count] of foodCount) {
    heap.insert({ food, count });
  }

  // Extract top K from the heap
  const result: string[] = [];
  while (heap.size() > 0) {
    result.push(heap.extract()!.food);
  }

  return result.reverse(); // Reverse to get descending order
}

// Usage example
(async () => {
  const k = 3;
  const topK = await getCommon(path.resolve(__dirname, "log.txt"), k);
  console.log("Top food orders:", topK);
})();

// Part 2 Streaming
// We now want to analyze food orders in a real-time streaming application. All food orders may not have been received at the time the top k most common ones need to be computed. Given the addition of this requirement, how would you handle processing incoming food orders and computing the top k?
// Your solution should have two functions ingestOrder(order) and getCommon(k).
// Expect the number of function calls to ingestOrder(order) and getCommon(k) to be roughly equal.

// ingestOrder(order)

// getCommon(k)

// const orderMap = new Map()
// const orderFreqIndexMap = new Map() // orderName -> index of the orderList
// const orderList = []

// class Node {
//   value int
//   name string
//   prevNode *Node
//   nextNode *Node
// }

// ordersMap ordername -> *node

// function ingestOrder(incomingOrder) {
//   orderTotal++
//   const f = orderMap.get(incomingOrder)
//   if (f) {
//     orderMap.set(incomingOrder, f + 1)
//     // find incomingOrder's position from orderFreqIndexMap
//     // check freq before incomingOrder
//       // if incomingOrder freq > before order freq
//         // swap position
//   } else {
//     orderMap.set(incomingOrder, 1)
//     orderList.push(incomingOrder)
//     // set incomingOrder idx in orderFreqIndexMap
//   }

// }

// function getCommon(k) {
//   // let i = 0
//   // while (i < orderTotal) {
//   //   orderMap
//   // }
// }
