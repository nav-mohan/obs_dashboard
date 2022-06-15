import { screen, render} from '@testing-library/react';
// import App from './App'
import LoginForm from './components/login-form'
import {Home} from "./views"

import ObsStdLogs from './components/obsLogs'

/**
 * 
 test('DESC: Renders entire App on screen', () => {
   render(<App />);
   const linkElement = screen.getByText(/This/i);
   expect(linkElement).toBeInTheDocument();
  });
*/

test('DESC: Renders Home View on screen', () => {
  render(<Home />);
  const linkElement = screen.getByText(/This/i);
  expect(linkElement).toBeInTheDocument();
});


test('DESC: Renders ObsStdLogs on screen', () => {
render(<ObsStdLogs stdOutLog={'HAHAHAHAHAHAAH'} />);
const linkElement = screen.getByText(/stdout/i);
  expect(linkElement).toBeInTheDocument();
});

test('DESC: Renders LoginForm on screen', () => {
render(<LoginForm />);
const linkElement = screen.getByText(/log/i);
  expect(linkElement).toBeInTheDocument();
});
