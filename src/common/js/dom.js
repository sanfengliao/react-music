export function attr(el, attr, val) {
  let prefix = "data-";
  let name = prefix + attr;
  if (val) {
    return el.setAttribute(name, val);
  }
  else {
    return el.getAttribute(name);
  }
}