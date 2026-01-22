import { validateEmail } from "~/utils/validateEmail"

// Dùng each để lặp qua các cases và test cho từng case, giúp chúng ta viết test ngắn gọn khi có nhiều bộ
// dữ liệu test lặp đi lặp lại cùng một logic.
// %p sẽ giúp chúng ta sử dụng nó là dạng placeholder kiểu pretty-format in ra log giá trị gốc khi test được
// thực hiện. Giúp dễ debug test case bị fail
// https://jestjs.io/docs/api#testeachtablename-fn-timeout

describe('Unit Test: validateEmail():', () => {
  const cases: any[] = [
    ['chuquangtus@gmail.com', true],
    ['chuquangtus@', false],
    ['@chuquangtus.com', false],
    [{ email: '@chuquangtus.com' }, true],
  ]
  it.each(cases)("%p => %p", (email, expected) => {
    expect(validateEmail(email)).toBe(expected)
  })
})