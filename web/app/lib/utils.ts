//https://codepen.io/sosuke/pen/Pjoqqp?editors=1010
export function getCssFilterByHex(hex: string) {
  switch (hex.toLowerCase()) {
    case "#fcec96":
      return "invert(86%) sepia(47%) saturate(354%) hue-rotate(348deg) brightness(103%) contrast(98%)";
    case "#fbbb81":
      return "invert(89%) sepia(54%) saturate(7391%) hue-rotate(301deg) brightness(98%) contrast(101%)";
    case "#acecff":
      return "invert(87%) sepia(23%) saturate(991%) hue-rotate(169deg) brightness(104%) contrast(101%)";
    default:
      return "";
  }
}
