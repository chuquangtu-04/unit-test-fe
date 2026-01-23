import { render, screen } from "@testing-library/react";
import { TodoList } from "~/components/TodoList/TodoList";

type ToDoMockData = {
  id: number,
  todo: string,
  completed: boolean,
  userId: number
}

const mockData: ToDoMockData[] = [
  {
    id: 1,
    todo: 'Chu Quang Tú',
    completed: true,
    userId: 1
  },
  {
    id: 2,
    todo: 'Chu Quang A',
    completed: true,
    userId: 1
  }
]

describe('<TodoList/>', () => {
  it('Fetch and display Todo List', async () => {
    // globalThis: chuẩn từ ES2020, chạy trên mọi môi trường: browser (window), node.js
    // (global) Web Worker (self)
    // jest.spyOn: tạo mock function cho object: ở đây là globalThis.fetch
    // https://jestjs.io/docs/es6-object-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    // mockResolvedValueOnce: lần gọi fetch tiếp theo sẽ trả về Promise.resolve với object bên dưới.
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        todos: mockData
      })
    } as any)

    render(<TodoList />)

    // getByText: chạy đồng bộ dùng khi chúng ta chắc chắn element đã có sẵn trong DOM
    // Kiểm tra chữ loading phải có trên mà hình
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // findByText: chạy bất đồng bộ (asynchronous) trả về Promise, sẽ chờ cho tới khi element xuất hiện

    // trong DOM, thường dùng khi element sẽ xuất hiện sau một hành động async như call API, setTimeout,...
    // Kiểm tra tất cả các todo của mock được hiển thị trên màn hình.
    for (const t of mockData) {
      expect(await screen.findByText(t.todo)).toBeInTheDocument()
    }
  })

  it('Should display no result when fetch error', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network Error'))

    render(<TodoList />)
    // Kiểm tra chữ loading phải có trên màn hình
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // Sau khi fetch lỗi xong, chữ nó Result phải có trên màn hình
    expect(await screen.findByText(/no result/i)).toBeInTheDocument()
  })
})