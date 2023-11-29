import "./plurimath-opal.js";
export default class Plurimath {
    data: Opal.Plurimath.Math.ParserResult;
    constructor(data: string, format: Opal.Plurimath.Math.Format);
    toAsciimath(): string;
    toLatex(): string;
    toMathml(): string;
    toHtml(): string;
    toOmml(): string;
}
