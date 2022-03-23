import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('Testing the component "<Pokedex />"', () => {
  it('Should have a heading text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const headTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(headTitle).toBeInTheDocument();
  });
  it('Should render the next pokemon after press the "Próximo pokémon" button'
  + ' and the first one after the last pokemon shown', () => {
    renderWithRouter(<App />);

    const displayPokemon = screen.getByAltText(/pikachu sprite/i);
    expect(displayPokemon).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      expect(displayPokemon).toHaveAttribute('alt', `${name} sprite`);
      userEvent.click(nextBtn);
    });
    expect(displayPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Should render just one pokemon at a time', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const displayPokemon = screen.getAllByAltText(`${name} sprite`);
      expect(displayPokemon).toHaveLength(1);
      userEvent.click(nextButton);
    });
  });
  it('Should render all filters buttons', () => {
    renderWithRouter(<App />);
    const pokemonTypes = pokemons
      .map(({ type }) => type);
    const eachType = pokemonTypes
      .filter((type, index) => pokemonTypes.indexOf(type) === index);

    const qtTypes = eachType.length;

    const allTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allTypeButtons).toHaveLength(qtTypes);

    allTypeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(eachType[index]);

      const allTypesButton = screen.getByRole('button', { name: 'All' });
      expect(allTypesButton).toBeInTheDocument();
    });
  });
  it('Should be able to see just the type of pokemon specific by the filter'
  + ' and return to see all after filter all', () => {
    renderWithRouter(<App />);
    const dragonType = 'Dragon';
    const fireType = 'Fire';
    const dragonButton = screen.getByRole('button', { name: dragonType });
    const fireButton = screen.getByRole('button', { name: fireType });
    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(dragonButton);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(dragonType);
    expect(nextButton).toBeDisabled();
    userEvent.click(fireButton);
    expect(pokemonType).toHaveTextContent(fireType);
    expect(pokemonType).not.toHaveTextContent(dragonType);
    userEvent.click(nextButton);
    expect(pokemonType).toHaveTextContent(fireType);
    userEvent.click(allButton);
    pokemons.forEach(({ type }) => {
      expect(pokemonType).toHaveTextContent(type);
      userEvent.click(nextButton);
    });
  });
});
