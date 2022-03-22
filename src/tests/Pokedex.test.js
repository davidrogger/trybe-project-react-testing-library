import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Testing the component "<Pokedex />"', () => {
  it('Should have a heading text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const headTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(headTitle).toBeInTheDocument();
  });
});
