import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import App from '../App';
// import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('Testing component <Pokemon />', () => {
  it('Should display the right data about the first pokemon data', () => {
    renderWithRouter(<App />);
    const firstPokemonName = pokemons[0].name;
    const firstPokemonType = pokemons[0].type;
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    const firstPokemonWeight = `${value} ${measurementUnit}`;
    const firstPokemonUrlImg = pokemons[0].image;
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { name: /sprite/i });
    expect(pokemonName).toHaveTextContent(firstPokemonName);
    expect(pokemonType).toHaveTextContent(firstPokemonType);
    expect(pokemonWeight).toHaveTextContent(firstPokemonWeight);
    expect(pokemonImg).toHaveAttribute('src', firstPokemonUrlImg);
    expect(pokemonImg).toHaveAttribute('alt', `${firstPokemonName} sprite`);
  });
});
