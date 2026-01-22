import { sum } from '~/utils/sum'

// Jest runtime đã cung cấp describe, it, expect dưới dạng global,
// function rồi nên có thể dùng luôn describe, it, expect… vv nhé

/**
 * describe: gom các test case liên quan lại với nhau
 * it: tạo một test case đơn lẻ
 * expect: Kiểm tra kết quả có đúng như mong đợi hay không
 */
describe('Unit test: sum():', () => {
  it('Should return the sum of two number', () => {
    expect(sum(10, 8)).toBe(18)
  })
})