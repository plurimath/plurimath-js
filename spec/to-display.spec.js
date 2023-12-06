import Plurimath from "../dist"

describe('to display', () => {
  it('', () => {
    const math = new Plurimath('sum_3^1 sintheta', 'asciimath')

    expect(math.toDisplay('asciimath').trim()).toBe(`
|_ Math zone
  |_ "sum_(3)^(1) sintheta"
     |_ "sum_(3)^(1) sintheta" summation
        |_ "3" subscript
        |_ "1" supscript
        |_ "sintheta" term
           |_ "sintheta" function apply
              |_ "sin" function name
              |_ "theta" argument`.trim())
  })
})
