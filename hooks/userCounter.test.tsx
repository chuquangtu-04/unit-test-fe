import { renderHook, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useCounter } from "./userCounter"

/**
 * Buổi này có thêm 2 nhân vật chính:
 * renderHook: render một custom hook trong môi trường test mà không cần phải tạo component thật
 * act: Đảm bảo mọi cập nhật state và side effect trong scope của nó dù là sync hay async đều được xử lý
 * xong hết trước khi chúng ta test kiểm tra kết quả.
*/

describe('useCounter Hook', () => {
  it('Khởi tạo với giá trị mặc định', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })
  it('Khởi tạo với giá trị custom', () => {
    const { result } = renderHook(() => useCounter(5))
    expect(result.current.count).toBe(5)
  })
  it('Tăng giá trị khi gọi increment()', () => {
    const { result } = renderHook(() => useCounter())
    act(() => {
      result.current.increment()
    })
    expect(result.current.count).toBe(1)
  })
  it('Giảm giá trị khi gọi descremnt()', () => {
    const { result } = renderHook(() => useCounter())
    act(() => {
      result.current.increment()
      result.current.decremnt()
    })
    expect(result.current.count).toBe(0)
  })
  it('Giảm giá trị khi gọi descremnt() và không âm', () => {
    const { result } = renderHook(() => useCounter())
    act(() => {
      result.current.increment()
      result.current.decremnt()
      result.current.decremnt()
    })
    expect(result.current.count).toBe(0)
  })

  it('Reset về giá trị ban đầu', () => {
    const { result } = renderHook(() => useCounter(3))
    act(() => {
      result.current.increment()
      result.current.reset()
    })
    expect(result.current.count).toBe(3)
  })
})