import Plurimath from "../dist"

describe('to unicodemath', () => {
  it('', () => {
    const math = new Plurimath('∑_𝑥^𝑦 𝑧', 'unicode')

    expect(math.toUnicodemath().trim()).toBe('∑_(𝑥)^(𝑦)▒〖𝑧〗')
  })
})
