import { Counter } from "~/components/Counter/Counter"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe('<Count/>', () => {
  it('Tăng giảm giá trị (đảm bảo không bị âm)', async () => {
    const user = userEvent.setup()

    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: '+' })
    const decrementButton = screen.getByRole('button', { name: '-' })

    // Tăng giá trị từ 0 lên 2
    await user.click(incrementButton)
    await user.click(incrementButton)

    // Giảm giá trị đi 3 lần (2-3 = -1) nhưng cần đảm bảo value không bị âm khi hiển thị trên ui
    await user.click(decrementButton)
    await user.click(decrementButton)
    await user.click(decrementButton)

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()

  })
})