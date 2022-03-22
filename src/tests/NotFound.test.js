import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import NotFound from '../components/NotFound';

describe('Testing the component "<NotFound />"', () => {
  it('Should have a heading text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const headTitle = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(headTitle).toBeInTheDocument();
  });
  it('Should have an image with the correct URL', () => {
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByRole('img', { name: /pikachu crying/i });
    expect(notFoundImg).toHaveAttribute('src', URL);
  });
});
