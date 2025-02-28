const { EventEmitter } = require("./event-emitter");

const emitter = new EventEmitter();

const onMessage = () => {
  console.log("incoming message!");
};

emitter.on("message", onMessage);

emitter.on("message", (args) => {
  console.log(args.sender, ":", args.content);
});

emitter.on("input", (...args) => {
  console.log("on input!", ...args);
});

emitter.emit("message", { sender: "sum tsui", content: "how u doing" });
// emitter.off("message", onMessage);
emitter.emit("message", { sender: "sum tsui", content: "how u doing" });
emitter.emit("input", "a", "b");
// emitter.emit("input", "a", "b");
// emitter.off("input");
// emitter.emit("input", "a", "b");
