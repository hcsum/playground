const wm = new WeakMap();

const obj = {};

wm.set(obj, "value");
wm.set("1", "1"); // throw error

console.log(wm.get(obj));

const obj2 = {};

obj2[obj] = obj;

console.log(obj2[obj]);

// Map/WeakMap/Object all can use object as key
// WeakMap can only use object as key
// WeakMap is a weak reference, so the key will be garbage collected if the object is no longer in use
