import { toHaveAttribute } from '@testing-library/jest-dom/dist/matchers';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { checkIsEmail, checkIsEqualStrings, checkIsPassportValid, ERRORS_MESSAGE, NOTIFICATION_MESSAGE } from '../../helpers.js';
import SignUpForm from './SignUpForm.jsx'

const password = "Test@1";
const passwordConfirmation = "Test@1";
const email = "test@gmail.com";
const notValidEmail = "testgmail.com";
const notValidPassword = "1"
const notValidPasswordConfirmation = "11"

test('it should have page title', () => {
  render(<SignUpForm />);
  const text = screen.getByText("Sign-up form");
  expect(text).toBeInTheDocument();
});

test('it should have form', () => {
    render(<SignUpForm />);
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  test('it should render email input', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByTestId("emailInput");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email", "placeholder", "Email");
    expect(emailInput).toHaveAttribute("placeholder", "Type Email Please");
    expect(emailInput.value).toBe('')
  });

  test('it should change email input value', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByTestId("emailInput");
    fireEvent.change(emailInput, email)
  });
  
  test('it should render password input with placeholder', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByTestId("passwordInput");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("placeholder", "Type Password Please");
    expect(passwordInput.value).toBe('')
  })

  test('it should change password input value', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByTestId("passwordInput");
    fireEvent.change(passwordInput, password)
  });

  test('it should render confirm password input with placeholder', () => {
    render(<SignUpForm />);
    const passwordInputConfirm = screen.getByTestId("passwordInputConfirm");
    expect(passwordInputConfirm).toBeInTheDocument();
    expect(passwordInputConfirm).toHaveAttribute("type", "password");
    expect(passwordInputConfirm).toHaveAttribute("placeholder", "Confirm Password Please");
    expect(passwordInputConfirm.value).toBe("")
  })

  test('it should change password confirmation input value', () => {
    render(<SignUpForm />);
    const passwordInputConfirm = screen.getByTestId("passwordInputConfirm");
    fireEvent.change(passwordInputConfirm, passwordConfirmation)
  });

  test('it should hide error messages when initialized', () => {
    render(<SignUpForm />);
    const errorEmail = screen.queryByText(ERRORS_MESSAGE.email);
    const errorPassword = screen.queryByText(ERRORS_MESSAGE.password);
    const errorPasswordConfirmation = screen.queryByText(ERRORS_MESSAGE.passwordConfirmation);
    expect(errorEmail).toBeNull()
    expect(errorPassword).toBeNull()
    expect(errorPasswordConfirmation).toBeNull()
  });

  test('it should display email error messages if email is invalid', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByTestId("emailInput");
    fireEvent.change(emailInput, {target: {value: notValidEmail}})
    const errorEmail = screen.queryByText(ERRORS_MESSAGE.email);
    expect(errorEmail).toBeInTheDocument();
  });

  test('it should display password error messages if password is invalid', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByTestId("passwordInput");
    fireEvent.change(passwordInput, {target: {value: notValidPassword}})
    const errorPassword = screen.queryByText(ERRORS_MESSAGE.password);
    expect(errorPassword).toBeInTheDocument()
  });

  test('it should display password error messages if password is invalid', () => {
    render(<SignUpForm />);
    const passwordInputConfirm = screen.getByTestId("passwordInputConfirm");
    fireEvent.change(passwordInputConfirm, {target: {value: notValidPasswordConfirmation}})
    const errorPasswordConfirmation = screen.queryByText(ERRORS_MESSAGE.passwordConfirmation);
    expect(errorPasswordConfirmation).toBeInTheDocument()
  });

  test('it should render submit button', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByTestId("submitButton");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
    expect(submitButton).toHaveAttribute("placeholder", "Submit");
  })

  test('it should have submit button disabled when initialized', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByTestId("submitButton");
    expect(submitButton).toBeDisabled()
  })

  test('it should have submit button disabled when not valid email, not valid password, not valid password confirmation', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByTestId("submitButton");
    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const passwordInputConfirm = screen.getByTestId("passwordInputConfirm");
    fireEvent.change(emailInput, notValidEmail)
    fireEvent.change(passwordInput, {target: {value: notValidPassword}})
    fireEvent.change(passwordInputConfirm, {target: {value: notValidPasswordConfirmation}})
    expect(submitButton).toBeDisabled()
  })

  test('it should have submit button enabled when valid email, not valid password, not valid password confirmation', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByTestId("submitButton");
    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const passwordInputConfirm = screen.getByTestId("passwordInputConfirm");
    fireEvent.change(emailInput, {target: {value: email}})
    fireEvent.change(passwordInput, {target: {value: password}})
    fireEvent.change(passwordInputConfirm, {target: {value: passwordConfirmation}})
    expect(submitButton).not.toBeDisabled()
  })

  test('it should have hidden success mesage when initialized', () => {
    render(<SignUpForm />);
    const successMessage = screen.queryByText(NOTIFICATION_MESSAGE.success);
    expect(successMessage).toBeNull()
  })

  test('it should display message when submit button cliked', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByTestId("submitButton");
    fireEvent.submit(submitButton);
    const successMessage = screen.queryByText(NOTIFICATION_MESSAGE.success);
    expect(successMessage).toBeInTheDocument()
  })

  test('it should hide success messege in 3s after it appeared', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByTestId("submitButton");
    fireEvent.submit(submitButton);
    const successMessage = screen.queryByText(NOTIFICATION_MESSAGE.success);
    expect(successMessage).toBeInTheDocument()

    wait(
        () => {
            expect(successMessage).toBeNull();
        },
        { timeout: 3000 }
    );
    
  })
  
  test('function should return valid email', () => {
    const result = checkIsEmail(email);
    expect(result).toBe(true)
  });

  test('function should return valid password', () => {
    const result = checkIsPassportValid(password)
    expect(result).toBe(true)
  });

  test('function should return valid password confirmation', () => {
    const result = checkIsEqualStrings(password, passwordConfirmation)
    expect(result).toBe(true)
  });