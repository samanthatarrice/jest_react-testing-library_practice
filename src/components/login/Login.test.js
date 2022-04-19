import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

//Fetch/Axios simulation. Using the __mocks__ folder
jest.mock('axios', () => ({

  __esModule: true,

  default: {
    get: () => ({
      data:{ id: 1, name: 'John'}
    })
  }
}))

test('username input should be rendered', ()=> {
  render(<Login/>);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
})

test('password input should be rendered', ()=> {
  render(<Login/>);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
})

test('button input should be rendered', ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeInTheDocument();
})

test('username input should be empty', ()=> {
  render(<Login/>);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe('');
})

test('username input should be empty', ()=> {
  render(<Login/>);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe('');
})


test('button should be disabled', ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeDisabled();
})

test('loading should not be rendered', ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).not.toHaveTextContent(/loading.../i);
})

test('error message should not be visible', ()=> {
  render(<Login/>);
  const errorEl = screen.getByTestId('error');
  expect(errorEl).not.toBeVisible();
})

test('username input should change', ()=> {
  render(<Login/>);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = 'test'
  fireEvent.change(userInputEl, { target:{value:testValue} });
  expect(userInputEl.value).toBe(testValue);
})

test('password input should change', ()=> {
  render(<Login/>);
  const passowrdInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'
  fireEvent.change(passowrdInputEl, { target:{value:testValue} });
  expect(passowrdInputEl.value).toBe(testValue);
})

test('button should not be disabled when inputs exist', ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passowrdInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userInputEl, { target:{value:testValue} });
  fireEvent.change(passowrdInputEl, { target:{value:testValue} });

  expect(buttonEl).not.toBeDisabled();
})

test('loading should be rendered when click', ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passowrdInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userInputEl, { target:{value:testValue} });
  fireEvent.change(passowrdInputEl, { target:{value:testValue} });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/loading.../i);
})

test('loading should be not be rendered after fetching', async ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passowrdInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userInputEl, { target:{value:testValue} });
  fireEvent.change(passowrdInputEl, { target:{value:testValue} });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/loading.../i));
})

test('user should be rendered after fetching', async ()=> {
  render(<Login/>);
  const buttonEl = screen.getByRole('button');
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passowrdInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userInputEl, { target:{value:testValue} });
  fireEvent.change(passowrdInputEl, { target:{value:testValue} });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText('John') //can't use getByText bc it's an async function

  expect(userItem).toBeInTheDocument('John');
})