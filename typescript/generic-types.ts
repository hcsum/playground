/** A class definition with a generic parameter */
class Queue<T> {
  private data = [];
  push = (item: T) => this.data.push(item);
  pop = (): T => this.data.shift();
}

const queue = new Queue<number>();
queue.push(0);
queue.push(1);
// queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

console.log("queue pop", queue.pop());

function identity<T, J extends Record<string, unknown>>(arg: T): T {
  const result = {} as J;
  console.log(result);
  return arg;
}

// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length); // Property 'length' does not exist on type 'T'.

//   return arg;
// }

function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
