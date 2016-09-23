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
}

module.exports = DOMNodeCollection;