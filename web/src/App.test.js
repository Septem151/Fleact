import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders fleact title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Fleact/i);
  expect(linkElement).toBeInTheDocument();
});

test('greeting button loads greeting page', () => {
  const { getByLabelText, getByRole } = render(<App />);
  fireEvent.click(getByRole('button', {name: "Greeting"}));
  expect(getByLabelText(/Name:/i)).toBeInTheDocument();
  expect(getByRole('button', { name: "Submit" })).toBeInTheDocument();
});

test('time button loads time page', () => {
  const { getByLabelText, getByRole } = render(<App />);
  fireEvent.click(getByRole('button', {name: "Current Time"}));
  expect(getByLabelText(/Timezone:/i)).toBeInTheDocument();
  expect(getByRole('button', { name: "Submit" })).toBeInTheDocument();
});

test('Mathematics button loads math page', () => {
  const { getByLabelText, getByRole } = render(<App />);
  fireEvent.click(getByRole('button', {name: "Mathematics"}));
  expect(getByLabelText(/Number 1:/i)).toBeInTheDocument();
  expect(getByLabelText(/Number 2:/i)).toBeInTheDocument();
  expect(getByRole('button', {name: "Add"})).toBeInTheDocument();
  expect(getByRole('button', {name: "Subtract"})).toBeInTheDocument();
  expect(getByRole('button', {name: "Multiply"})).toBeInTheDocument();
  expect(getByRole('button', {name: "Divide"})).toBeInTheDocument();
  expect(getByRole('button', {name: "Power"})).toBeInTheDocument();
});
