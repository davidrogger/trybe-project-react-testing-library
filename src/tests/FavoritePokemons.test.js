import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

import pokemons from '../data';

const pokemon = pokemons[0];

const { name, id } = pokemon;

describe('Testing the component "<FavoritePokemons />"', () => {
  it('Should have a message "No favorite pokemon found" when favorite is empty', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('Should have the first pokemon as listed as favorite', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const pokemonName = screen.getByTestId('pokemon-name');
    const favoriteCheck = screen.getByLabelText(/pokémon favoritado/i);
    expect(pokemonName).toBeInTheDocument();
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    history.push('/favorites');
    const favoritePokemonName = screen.getByText(name);
    expect(favoritePokemonName).toBeInTheDocument();
  });
});
