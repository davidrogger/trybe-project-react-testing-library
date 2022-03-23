import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  it('Should have a details link to gather more information about the pokemon', () => {
    renderWithRouter(<App />);
    const pokemonId = pokemons[0].id;
    const pokemonLink = `/pokemons/${pokemonId}`;
    const detailLink = screen.getByRole('link', { name: /more details/i });
    expect(detailLink).toBeInTheDocument();
    expect(detailLink).toHaveAttribute('href', pokemonLink);
  });
  it('Should redirect to a new component with more details about de pokemon'
  + ' after pressing details', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonId = pokemons[0].id;
    const detailLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemonId}`);
  });
  it('Should render a star in the card when the pokemon is favorite'
  + ' and not when isn\'t', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailLink);
    const favoriteCheckBox = screen.getByLabelText(/pokémon favoritado/i);
    expect(favoriteCheckBox).toBeInTheDocument();
    expect(favoriteCheckBox).toHaveProperty('checked', false);
    const favoriteIcoDisable = screen.queryByRole('img', { name: /marked as favorite/i });
    expect(favoriteIcoDisable).not.toBeInTheDocument();
    userEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox).toHaveProperty('checked', true);
    const favoriteIco = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favoriteIco).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIco).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    expect(favoriteIco).toHaveAttribute('alt', `${pokemonName} is marked as favorite`);
  });
});
