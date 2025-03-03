const numberLength13Regex = /(\d{13})/g;

function replaceTextNodes(node) {
  node.childNodes.forEach(function (el) {
    // If this is not a text node, or it is an empty text node, ignore it
    if (el.nodeType !== 3 || el.nodeValue.trim() === "") {
      replaceTextNodes(el);
      return;
    }
    el.nodeValue = el.nodeValue.replace(numberLength13Regex, function (match) {
      return new Date(parseInt(match)).toUTCString();
    });
  });
}

replaceTextNodes(document.body);
