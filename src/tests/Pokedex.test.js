import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Testing the component "<Pokedex />"', () => {
  it('Should have a heading text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const headTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(headTitle).toBeInTheDocument();
  });
  it('Should render the next pokemon after press the "Próximo pokémon" button'
  + ' and the first one after the last pokemon shown', () => {
    renderWithRouter(<App />);

    const allPokemonsAltTexts = ['Pikachu sprite', 'Charmander sprite', 'Caterpie sprite',
      'Ekans sprite', 'Alakazam sprite', 'Mew sprite', 'Rapidash sprite',
      'Snorlax sprite', 'Dragonair sprite', 'Pikachu sprite'];

    const displayPokemon = screen.getByAltText(/pikachu sprite/i);
    expect(displayPokemon).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    allPokemonsAltTexts.forEach((altText) => {
      expect(displayPokemon).toHaveAttribute('alt', altText);
      userEvent.click(nextBtn);
    });
  });
  it('Should render just one pokemon at a time', () => {
    renderWithRouter(<App />);
    const displayPokemon = screen.getAllByAltText(/pikachu sprite/i);
    expect(displayPokemon).toHaveLength(1);
  });
});
