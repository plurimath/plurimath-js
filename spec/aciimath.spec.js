import Plurimath from "../dist"

describe('asciimath', () => {
  it('#22', () => {
    const math = new Plurimath('left[[1,3], [1,3], [1,3]right] left(sum_prod^sigmaright)', 'asciimath')

    expect(math.toAsciimath()).toBe('[[1, 3], [1, 3], [1, 3]] left( sum_(prod)^(sigma) right)')
  })
})
