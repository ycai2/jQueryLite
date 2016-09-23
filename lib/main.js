$l = function (arg) {
  if (typeof arg === "string") {
    return Array.from(document.querySelectorAll(arg));
  }
};

window.$l = $l;
