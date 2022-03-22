import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';

describe('Testing the component "<FavoritePokemons />"', () => {
  it('Should have a message "No favorite pokemon found" when favorite is empty', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
