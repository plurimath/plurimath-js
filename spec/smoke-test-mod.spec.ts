import PlurimathMod from "../dist"

describe('asciimath', () => {
  it('#31', () => {
    const math = new PlurimathMod('left[[1,3], [1,3], [1,3]right] left(sum_prod^sigmaright)', 'asciimath')

    expect(math.toAsciimath()).toBe('[[1, 3], [1, 3], [1, 3]] left( sum_(prod)^(sigma) right)')
  })
})
