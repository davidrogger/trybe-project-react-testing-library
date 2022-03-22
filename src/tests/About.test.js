import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';

import renderWithRouter from './renderWithRouter';

describe('Testing the component "<About />"', () => {
  it('Should a heading text with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const headTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headTitle).toBeInTheDocument();
  });
});
