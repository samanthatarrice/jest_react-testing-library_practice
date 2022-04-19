import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); //screen comes from testing library. finds the element that has "learn react" as text./i makes is regex which makes it case insensitive.
  expect(linkElement).toBeInTheDocument(); //checks if the element exists in the document
});

test('renders 3 list items', () => {
  render(<App />);
  const listItems = screen.getAllByRole('listitem'); //'listitem' is from React-Testing-Library. Targets by type of html element
  // expect(listItems).toHaveLength(3);
  // expect(listItems.length).toBe(3); 
  expect(listItems.length).toEqual(3); //same meaning as above. Many Jest methods like .toHaveLength, .toBe, .toEqual...
});

test('renders title', () => {
  render(<App />);
  const title = screen.getByTestId('mytestid'); //gets by data-testid attribute in html. Use this when the docs don't have a special name in react-testing-library
  // expect(listItems.length).toBe(3); 
  expect(title).toBeInTheDocument(); 
});

test('sum should be 6', () => {
  render(<App />);
  const sum = screen.getByTitle('sum'); //gets by title attribute
  expect(sum.textContent).toBe('5'); 
});
