import "./plurimath-opal.js";

Opal.require("plurimath");

export default class Plurimath {
  data: Opal.Plurimath.Math.ParserResult

  constructor(data: string, format: Opal.Plurimath.Math.Format) {
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

  toDisplay(lang: string) {
    return this.data.$to_display(lang);
  }

  toUnicodemath() {
    return this.data.$to_unicodemath();
  }
}
