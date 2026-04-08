import Plurimath from "../dist"

describe('to unicodemath', () => {
  it('matches conversion of UnicodeMath equation to UnicodeMath', () => {
    const math = new Plurimath('∑_𝑥^𝑦 𝑧', 'unicode')

    expect(math.toUnicodemath().trim()).toBe('∑_(𝑥)^(𝑦)▒〖𝑧〗')
  })

  it('matches conversion of LaTeX equation to UnicodeMath', () => {
    const math = new Plurimath('M \\= \\begin{bmatrix} \\-\\sin λ_0 \\& \\cos λ_0 \\& 0 \\\\ \\-\\sin φ_0 \\cos λ_0 \\& \\-\\sin φ_0 \\sin λ_0 \\& \\cos φ_0 \\\\ \\cos φ_0 \\cos λ_0 \\& \\cos φ_0 \\sin λ_0 \\& \\sin φ_0 \\end{bmatrix}', 'latex')

    expect(math.toUnicodemath()).toBe('M = ⓢ(− sin⁡λ_(0)&cos⁡λ_(0)&0@− sin⁡φ_(0)cos⁡λ_(0)&− sin⁡φ_(0)sin⁡λ_(0)&cos⁡φ_(0)@cos⁡φ_(0)cos⁡λ_(0)&cos⁡φ_(0)sin⁡λ_(0)&sin⁡φ_(0))')
  })

  it('tests basic equation performing plus operation', () => {
    const math = new Plurimath('M \\= a \\+ b', 'latex')

    expect(math.toUnicodemath()).toBe('M = a + b')
  })
})
