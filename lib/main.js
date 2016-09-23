const DOMNodeCollection = require("./dom_node_collection");

const funcQueue = [];

window.$l = function (arg) {
  if (typeof arg === "string") {
    return new DOMNodeCollection(
      Array.from(document.querySelectorAll(arg))
    );
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(
      [arg]
    );
  } else if (typeof arg === "function") {

    if (document.readyState === "complete") {
      arg();
    } else {
      funcQueue.push(arg);
    }
  }
};

function execute() {
  funcQueue.forEach( (func) => {
    func();
  });
}

document.addEventListener("DOMContentLoaded", execute);
