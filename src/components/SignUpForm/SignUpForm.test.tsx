import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "~/components/SignUpForm/SignUpForm";


describe('<SignUpForm/>', () => {
  it('Should fill inputs with default values initially', () => {
    render(
      <SignUpForm
        onSubmit={jest.fn()}
        defaultValues={{
          email: 'chuquangtus2004@gmail.com',
          password: '123456'
        }}
      />
    )

    // Kiểm tra defaultValue của email đã được đặt ở input chưa
    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue('chuquangtus2004@gmail.com')
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('123456')
  })

  it('Should fill inputs with default values initially', async () => {
    render(
      <SignUpForm
        onSubmit={jest.fn()}
      />
    )

    // User nhấn click vào button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra error email đang hiển thị trên màn hình

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()

    // Kiểm tra mockSubmit chưa được gọi vì đang lỗi validate
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Should show error if email is invalid', async () => {
    const mockOnSubmit = jest.fn()
    render(
      <SignUpForm
        onSubmit={mockOnSubmit}
      />
    )
    // Hành động user gõ nội dung sai vào input email
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      '1233234sdfsdf'
    )
    // Hành động user gõ nội dung đúng vào input password
    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '123456a@'
    )

    // User nhấn vào click button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra error email đang hiển thị trên màn hình
    expect(await screen.findByText(/Email is not valid/i)).toBeInTheDocument()

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('Should show error if password is invalid', async () => {
    const mockOnSubmit = jest.fn()
    render(
      <SignUpForm onSubmit={mockOnSubmit} />
    )
    // Hành động user gõ nội dung đúng vào input email
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'chuquangtus2004@gmail.com'
    )

    // Hành động user gõ sai nội dung vào input password
    // await userEvent.type(
    //   screen.getByPlaceholderText(/enter password/i),
    // )

    // User nhấn vào click button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra error password đang hiển thị trên màn hình
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument()

    expect(mockOnSubmit).not.toHaveBeenCalled()

  })


  it('Case validate from success and submit', async () => {
    const mockOnSubmit = jest.fn()

    render(
      <SignUpForm
        onSubmit={mockOnSubmit}
      />
    )
    // Người dùng nhập đúng from email, password
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'chuquangtus2004@gmail.com'
    )
    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      'chuquangtus2003'
    )

    // user onsubmit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra mocksubmit đc gọi một lần
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)

    // Kiểm tra mockSubmit được gọi với object có email và password như trên
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'chuquangtus2004@gmail.com',
      password: 'chuquangtus2003'
    })

    // Reset from sau khi onsubmit dc gọi
    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('')
  })
})