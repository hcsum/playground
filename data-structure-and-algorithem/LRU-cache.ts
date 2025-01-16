class MyNode {
  public key: number;
  public value: number;
  public next: MyNode | null;
  public prev: MyNode | null;
  constructor(
    value: number,
    key: number,
    next: MyNode | null,
    prev: MyNode | null,
  ) {
    this.value = value;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

class LRUCache {
  private head: MyNode | null; // LRU
  private tail: MyNode | null; // MRU
  private cap: number;
  private length = 0;
  private cache = new Map<number, MyNode>();
  constructor(capacity: number) {
    this.cap = capacity;
  }

  get(key: number): number {
    const res = this.cache.get(key);
    if (res) {
      this.moveToHead(res);
      this.log();
      return res.value;
    }
    this.log();
    return -1;
  }

  put(key: number, value: number): void {
    let node = this.cache.get(key);
    if (node) {
      node.value = value;
    } else {
      this.length++;
      node = new MyNode(value, key, null, null);
      this.cache.set(key, node);
    }
    this.moveToHead(node);
    if (this.length > this.cap) {
      const tail = this.removeFromTail();
      this.cache.delete(tail!.key);
      this.length--;
    }
    this.log();
  }

  private moveToHead(node: MyNode) {
    if (this.head === node) return;
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    if (node.prev) node.prev.next = node.next; // new node
    if (node.next) node.next.prev = node.prev;
    if (node === this.tail) {
      this.tail = this.tail.prev;
    }
    node.next = this.head;
    node.prev = null;
    this.head.prev = node;
    this.head = node;
  }
  private removeFromTail() {
    // this.log()
    const prev = this.tail!.prev;
    this.tail!.prev = null;
    prev!.next = null;
    const oldTail = this.tail;
    this.tail = prev;
    return oldTail;
  }

  private log() {
    // console.log("tail:", this.tail?.value);
    let node = this.head;
    let str = "";
    while (node) {
      str += node.value;
      str += ",";
      node = node.next;
    }
    console.log(str);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const obj = new LRUCache(3);

obj.put(1, 1);
obj.put(2, 2);
obj.put(3, 3);
obj.get(1);
obj.put(4, 4);
obj.get(3);
