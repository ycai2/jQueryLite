const DOMNodeCollection = require("./dom_node_collection");

$l = function (arg) {
  if (typeof arg === "string") {
    return new DOMNodeCollection(
      Array.from(document.querySelectorAll(arg))
    );
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(
      [arg]
    );
  }
};

window.$l = $l;
