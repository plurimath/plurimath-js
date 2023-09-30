declare namespace Opal {
  type ModuleName = 'plurimath'

  declare function require(module: ModuleName): void

  declare namespace Plurimath {
    declare namespace Math {
      type Format = 'asciimath' | 'latex' | 'mathml' | 'html' | 'mahtml' | 'omml'
      function $parse(data: string | unknown, format: Format): ParserResult

      type TransmuterFunction = () => string

      class ParserResult {
        $to_latex: TransmuterFunction
        $to_asciimath: TransmuterFunction
        $to_mathml: TransmuterFunction
        $to_html: TransmuterFunction
        $to_omml: TransmuterFunction
      }
    }
  }
}

declare module './plurimath-opal.js' {
  export = Opal
}
