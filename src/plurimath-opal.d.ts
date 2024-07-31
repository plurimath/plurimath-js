declare namespace Opal {
  type ModuleName = 'plurimath'

  function require(module: ModuleName): void

  namespace Plurimath {
    namespace Math {
      type Format = 'asciimath' | 'latex' | 'mathml' | 'html' | 'unicode' | 'omml'
      function $parse(data: string | unknown, format: Format): ParserResult

      type TransmuterFunction = () => string

      class ParserResult {
        $to_latex: TransmuterFunction
        $to_asciimath: TransmuterFunction
        $to_mathml: TransmuterFunction
        $to_html: TransmuterFunction
        $to_omml: TransmuterFunction
        $to_display: (string) => string
        $to_unicodemath: TransmuterFunction
      }
    }
  }
}

