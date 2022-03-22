import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Testing the component "<App />"', () => {
  it('Should have 3 links with the text, "Home", "About" and "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
});
