// We have to declare as var to avoid "already defined" error in user console
var readableTimestampsAttrKey = "data-readable-ts-original-value";
var alreadyModified = [
  ...document.querySelectorAll(`[${readableTimestampsAttrKey}]`),
];

function replaceTextNodes(node) {
  const numberLength11Or13Regex = /\b\d{10,13}\b/g;
  node.childNodes.forEach(function (el) {
    // If this is not a text node, or it is an empty text node, ignore it
    if (el.nodeType !== 3 || el.nodeValue.trim() === "") {
      replaceTextNodes(el);
      return;
    }
    el.nodeValue = el.nodeValue.replace(
      numberLength11Or13Regex,
      function (match) {
        el.parentElement?.setAttribute(readableTimestampsAttrKey, el.nodeValue);
        return new Date(
          parseInt(match.length === 10 ? match + "000" : match)
        ).toLocaleString();
      }
    );
  });
}

// Allows the extension to toggle between the original and modified values
if (alreadyModified.length) {
  alreadyModified.forEach(function (el) {
    el.innerText = el.getAttribute(readableTimestampsAttrKey);
    el.removeAttribute(readableTimestampsAttrKey);
  });
} else {
  replaceTextNodes(document.body);
}
