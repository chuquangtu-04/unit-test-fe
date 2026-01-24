import { render, screen } from "@testing-library/react"
import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch"
import userEvent from "@testing-library/user-event"


describe('<DebounceSearch/>', () => {
  it('Should fetch users after debounce', async () => {
    // Mock call api với query cụ thể hoặc không có query
    // mockImplementation: gắn cùng một logic mock cho tất cả các lần gọi mock fetch

    jest.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      if (url.includes('chuquangtu')) {
        return {
          json: async () => [{ id: 1, name: 'chuquangtu - một lập trình viên' }]
        }
      }
      return { json: async () => [{}] } as any
    })

    render(
      <DebounceSearch />
    )

    // Lần đầu gọi fetch khi mount component với query rỗng
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('users?q=')
    )
    // Tìm ô input có placeholder chứa chữ 'search', sau đó giả lập hành động người dùng gõ từng ký tự 'chuquangtu' vào đó.
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'chuquangtu')

    // Lúc này debounce chưa xong => fetch chưa được gọi lần 2, vẫn là lần 1
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)

    // await findByText sẽ đợi debounce chạy và check kết quả render ra ui
    expect(await screen.findByText(/chuquangtu - một lập trình viên/i)).toBeInTheDocument()

    // Kiểm tra fetch được gọi thêm lần nữa (tổng 2 lần) và lúc này query có chứa 'chuquangtu'
    expect(globalThis.fetch).toHaveBeenCalledTimes(2)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('users?q=chuquangtu')
    )
  })

  it('Should no result when fetch api error', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    render(
      <DebounceSearch />
    )

    // Kiểm tra chữ loading phải có trên màn hình
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // Sau khi fetch lỗi xong, chữ no result phải có trên màn hình
    expect(await screen.getByText(/no result/i)).toBeInTheDocument()
  })
})