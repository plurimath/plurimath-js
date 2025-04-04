import Plurimath from "../dist"

describe('to mathml with intent', () => {
  it('', () => {
    const math = new Plurimath('∑_𝑥^𝑦 𝑧', 'unicode')

    expect(math.toMathml(true).trim()).toBe('<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">\n  <mstyle displaystyle="true">\n    <mrow intent=":sum(𝑥,𝑦,$naryand)">\n      <munderover>\n        <mo>&#x2211;</mo>\n        <mi>&#x1d465;</mi>\n        <mi>&#x1d466;</mi>\n      </munderover>\n      <mrow arg="naryand">\n        <mi>&#x1d467;</mi>\n      </mrow>\n    </mrow>\n  </mstyle>\n</math>')
  })
})
