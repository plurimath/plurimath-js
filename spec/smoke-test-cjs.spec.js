const PlurimathCJS = require("../dist/index.cjs").default;

describe('asciimath', () => {
  it('#22', () => {
    const math = new PlurimathCJS('left[[1,3], [1,3], [1,3]right] left(sum_prod^sigmaright)', 'asciimath')

    expect(math.toAsciimath()).toBe('[[1, 3], [1, 3], [1, 3]] left( sum_(prod)^(sigma) right)')
  })
})
