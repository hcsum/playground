import HashTable from "./hash-table";

const hashTable = new HashTable();

hashTable.set("name", "Alice");
hashTable.set("age", 25);
hashTable.set("occupation", "Engineer");
hashTable.set("name", "Bob"); // Update the value of the "name" key

console.log(hashTable.get("name")); // Output: "Bob"
console.log(hashTable.get("age")); // Output: 25

hashTable.delete("age");
console.log(hashTable.get("age")); // Output: undefined

console.log(hashTable.keys()); // Output: ["name", "occupation"]
console.log(hashTable.values()); // Output: ["Bob", "Engineer"]
console.log(hashTable.keyMap);
