import { Button } from "~/components/Button/Button"
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"


describe('<Button />', () => {  
  it('Should render and click to button: ', async () => {
    // Tạo một cái user instance
    const user = userEvent.setup()
    // Tạo mock function onClick bằng Jest
    const onClick = jest.fn()
    // Mount component <Button /> vào DOM ảo trong mô trường test
    render(<Button content="Click Me" onClick={onClick} />)
    const button = screen.getByRole("button", { name: /click me/i })

    // Mô phỏng 1 click của người dùng vào button
    await user.click(button)
    // Kiểm tra button vẫn đang nằm tron document (không bị unmount)
    expect(button).toBeInTheDocument()
    // Kiểm tra mock onclick đã được gói đúng một lần khi click hay chưa
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})