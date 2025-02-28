const _items = Symbol("stackItems");

class Stack {
  dummy;
  constructor() {
    this[_items] = [];
  }

  push(item) {
    this[_items].push(item);
  }

  pop() {
    return this[_items].pop();
  }

  peek() {
    return this[_items][this[_items].length - 1];
  }

  isEmpty() {
    return this[_items].length === 0;
  }
}

const stack = new Stack();
stack.push(5);
stack.push(8);

console.log(Object.getOwnPropertyNames(stack)); // items will not be printed, good enough

let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols);

console.log(stack[objectSymbols[0]]);

stack[objectSymbols[0]].push(1);

console.log(stack.peek());
