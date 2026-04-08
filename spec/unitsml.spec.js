import Plurimath from "../dist"

describe('unitsml asciimath', () => {
  it('converts simple unit: kg', () => {
    const math = new Plurimath('"unitsml(kg)"', 'asciimath')

    expect(math.toAsciimath()).toBe('rm(kg)')
    expect(math.toLatex()).toBe('\\mathrm{kg}')
    expect(math.toMathml()).toMatch(/<mstyle mathvariant="normal">\s*<mi>kg<\/mi>\s*<\/mstyle>/)
  })

  it('converts unit with value: 9.8 m/s^2', () => {
    const math = new Plurimath('9.8 "unitsml(m/s^2)"', 'asciimath')

    expect(math.toAsciimath()).toBe('9.8 rm(m) * rm(s)^(- 2)')
    expect(math.toLatex()).toBe('9.8 \\mathrm{m} \\cdot \\mathrm{s}^{- 2}')
  })

  it('converts frequency unit: Hz', () => {
    const math = new Plurimath('"unitsml(Hz)"', 'asciimath')

    expect(math.toAsciimath()).toBe('rm(Hz)')
    expect(math.toLatex()).toBe('\\mathrm{Hz}')
  })

  it('converts prefixed unit: MHz', () => {
    const math = new Plurimath('"unitsml(MHz)"', 'asciimath')

    expect(math.toAsciimath()).toBe('rm(MHz)')
    expect(math.toLatex()).toBe('\\mathrm{MHz}')
  })

  it('converts compound unit: g/mol', () => {
    const math = new Plurimath('"unitsml(g/mol)"', 'asciimath')

    expect(math.toAsciimath()).toBe('rm(g) * rm(mol)^(- 1)')
    expect(math.toLatex()).toBe('\\mathrm{g} \\cdot \\mathrm{mol}^{- 1}')
  })

  it('converts unit in expression context', () => {
    const math = new Plurimath('1 "unitsml(A)"', 'asciimath')

    expect(math.toAsciimath()).toBe('1 rm(A)')
    expect(math.toLatex()).toBe('1 \\mathrm{A}')
  })

  it('converts Hz in complex expression', () => {
    const math = new Plurimath('540 xx 10^(12) "unitsml(Hz)"', 'asciimath')

    expect(math.toAsciimath()).toContain('rm(Hz)')
    expect(math.toLatex()).toContain('\\mathrm{Hz}')
  })
})
