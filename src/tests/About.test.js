import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa o componente "<About.js />"', () => {
  test(
    '1 - Verifica se a página contém um heading h2 com o texto "About Pokédex"',
    () => {
      renderWithRouter(<About />);

      const ttle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

      expect(ttle).toBeInTheDocument();
    },
  );

  it('2 - Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const limited = 2;
    const paragraphsAbout = screen.queryAllByText(/Pokémons/i);
    expect(paragraphsAbout.length).toEqual(limited);
  });

  it('3 - Verifica se a página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const linkImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText('Pokédex');

    expect(image.src).toContain(linkImage);
  });
});