import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

import pokemons from '../data';

const pokemon = pokemons[0];
const { name, id, summary, foundAt } = pokemon;

describe('Testing the component <PokemonDetails />', () => {
  it('Should have the pokemon name as title in the details page', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const titleName = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(titleName).toBeInTheDocument();
  });
  it('Shouldn\'t have the details link in the page anymore', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const detailsButton = screen.queryByRole('link', { name: /more details/i });
    expect(detailsButton).not.toBeInTheDocument();
  });
  it('Should have a heading text with the text summary,'
  + ' with a paraph with something about that pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const summaryTitle = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();
    const pokeSummary = screen.getByText(summary);
    expect(pokeSummary).toBeInTheDocument();
  });
  it('Should have a field with a title locations, and a text details about it', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const titleText = `Game Locations of ${name}`;
    const locationTitle = screen.getByRole('heading', { level: 2, name: titleText });
    expect(locationTitle).toBeInTheDocument();
  });
  it('Should have all locations with names and imagens', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const qtLocations = foundAt.length;
    const allLocationsImg = screen.getAllByAltText(`${name} location`);
    expect(allLocationsImg).toHaveLength(qtLocations);
    foundAt.forEach((details, index) => {
      const { map, location } = details;
      expect(allLocationsImg[index]).toHaveAttribute('src', map);
      const locationTitle = screen.getByText(location);
      expect(locationTitle).toBeInTheDocument();
    });
  });
});
