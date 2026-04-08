import Plurimath from "../dist"

describe('to mathml with intent', () => {
  it('adds MathML intent metadata when requested', () => {
    const math = new Plurimath('∑_𝑥^𝑦 𝑧', 'unicode')
    const mathml = math.toMathml(true).trim()

    expect(mathml).toContain('intent=":sum(𝑥,𝑦,$naryand)"')
    expect(mathml).toContain('<munderover>')
    expect(mathml).toMatch(/<mo>(&#x2211;|∑)<\/mo>/)
    expect(mathml).toMatch(/<mrow arg="naryand">\s*<mi>(&#x1d467;|𝑧)<\/mi>\s*<\/mrow>/)
  })

  it('omits MathML intent metadata by default', () => {
    const math = new Plurimath('∑_𝑥^𝑦 𝑧', 'unicode')

    expect(math.toMathml()).not.toContain(' intent=')
    expect(math.toMathml()).not.toBe(math.toMathml(true))
  })
})
