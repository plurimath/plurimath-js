"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./plurimath-opal.cjs");
Opal.require("plurimath");
class Plurimath {
  constructor(data, format) {
    this.data = Opal.Plurimath.Math.$parse(data, format);
  }
  toAsciimath() {
    return this.data.$to_asciimath();
  }
  toLatex() {
    return this.data.$to_latex();
  }
  toMathml(intent = false) {
    return this.data.$to_mathml(new Map([["intent", intent]]));
  }
  toHtml() {
    return this.data.$to_html();
  }
  toOmml() {
    return this.data.$to_omml();
  }
  toDisplay(lang) {
    return this.data.$to_display(lang);
  }
  toUnicodemath() {
    return this.data.$to_unicodemath();
  }
}
exports.default = Plurimath;
