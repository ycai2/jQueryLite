/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlElements) {
	    this.htmlElements = htmlElements;
	  }

	  html(string) {
	    if (string === undefined) {
	      return this.htmlElements[0].innerHTML;
	    } else {
	      this.htmlElements[0].innerHTML = string;
	      return;
	    }
	  }

	  empty() {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.innerHTML = "";
	    });
	    return;
	  }

	  append(content) {
	    if (content instanceof DOMNodeCollection) {
	      this.htmlElements.forEach( (parentElement) => {
	        content.htmlElements.forEach( (childElement) => {
	          parentElement.innerHTML += childElement.outerHTML;
	        });
	      });
	    } else if (typeof content === 'string') {
	      this.htmlElements.forEach( (htmlElement) => {
	        htmlElement.innerHTML += content;
	      });
	    } else if (content instanceof HTMLElement) {
	      this.htmlElements.forEach( (htmlElement) => {
	        htmlElement.innerHTML += content.outerHTML;
	      });
	    }
	  }

	  attr(name, value) {
	    if (value === undefined) {
	      return this.htmlElements[0].getAttribute(name);
	    } else {
	      this.htmlElements[0].setAttribute(name, value);
	      return;
	    }
	  }

	  addClass(name) {
	    this.htmlElements.forEach( (htmlElement) => {
	      name.split(" ").forEach ( (className) => {
	        htmlElement.classList.add(className);
	      });
	    });
	  }

	  removeClass(name) {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.classList.remove(name);
	    });
	  }

	  children() {
	    let childrenCollection = [];
	    this.htmlElements.forEach( (htmlElement) => {
	      childrenCollection = childrenCollection.concat(htmlElement.children);
	    });

	    return new DOMNodeCollection(childrenCollection);
	  }

	  parent() {
	    const parentCollection = this.htmlElements.map( (htmlElement) => {
	      return htmlElement.parentElement;
	    });

	    return new DOMNodeCollection(parentCollection);
	  }

	  find(selector) {
	    let queryResult = [];
	    this.htmlElements.forEach( (htmlElement) => {
	      queryResult = queryResult.concat(htmlElement.querySelectorAll(selector));
	    });

	    return new DOMNodeCollection(queryResult);
	  }

	  remove() {
	    this.empty();
	    this.htmlElements = [];
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);