import "./plurimath-opal.mjs";

Opal.require("plurimath");

export default class Plurimath {
  constructor(data, format) {
    this.data = Opal.Plurimath.Math.$parse(data, format);
  }

  toAsciimath() {
    return this.data.$to_asciimath();
  }

  toLatex() {
    return this.data.$to_latex();
  }

  toMathml() {
    return this.data.$to_mathml();
  }

  toHtml() {
    return this.data.$to_html();
  }

  toOmml() {
    return this.data.$to_omml();
  }
}
