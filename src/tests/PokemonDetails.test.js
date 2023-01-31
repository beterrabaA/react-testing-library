import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('1 - As inforções detalhadas são exibidas na tela', () => {
    const resumePokemon1 = 'This intelligent Pokémon roasts hard berries';
    const resumePokemon2 = ' with electricity to make them tender enough to eat.';
    renderWithRouter(<App />);

    const detailsLast = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLast);
    // A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;
    const lastPikaH2 = screen.getByRole('heading', {
      name: /pikachu details/i, level: 2 });
    expect(lastPikaH2).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do pokémon selecionado;
    expect(detailsLast).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary;
    const summaryh2 = screen.getByRole('heading', {
      name: /summary/i, level: 2 });
    expect(summaryh2).toBeInTheDocument();
    // A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado.
    const paragraphsSummary = screen.queryByText(resumePokemon1 + resumePokemon2);
    expect(paragraphsSummary).toBeInTheDocument();
  });

  it('2 - Verifica se existe umas sessão que motras os dados de localização', () => {
    renderWithRouter(<App />);

    const detailsLast2 = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLast2);
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of Pikachu
    const locationh2 = screen.getByRole('heading', {
      name: /game locations of pikachu/i, level: 2 });
    expect(locationh2).toBeInTheDocument();
    // Todas as localizações do pokémon devem ser mostradas na seção de detalhes;
    const linkLoc1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const linkLoc2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const location1 = screen.queryByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();
    const altLoc = screen.getAllByAltText(/pikachu location/i);
    expect(altLoc[0].src).toContain(linkLoc1);

    const location2 = screen.queryByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();
    expect(altLoc[1].src).toContain(linkLoc2);
  });

  it('3 - Mostra se favorita ou não Pokemon', () => {
    renderWithRouter(<App />);
    // Clica no "More Details"
    const detailsLast3 = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLast3);
    // Cliques consecutivos
    const labelCheck1 = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(labelCheck1);
    userEvent.click(labelCheck1);
    userEvent.click(labelCheck1);
  });
});