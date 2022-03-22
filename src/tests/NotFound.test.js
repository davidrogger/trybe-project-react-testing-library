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
});
