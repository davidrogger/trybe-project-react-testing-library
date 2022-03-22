import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';

import renderWithRouter from './renderWithRouter';

describe('Testing the component "<About />"', () => {
  it('Should a heading text with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const headTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headTitle).toBeInTheDocument();
  });
  it('Should have 2 paragraphs explaining about the pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/this application simulates/i);
    const secondParagraph = screen.getByText(/one can filter/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Should have an image with the alt "Pokédex" and correct source URL', () => {
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', URL);
  });
});
