import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente "<<Pokedex.js /> />"', () => {
  test('1 - Contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2 });
    expect(encountered).toBeInTheDocument();
  });

  it('2 - Verifica se é exibido o próximo pokémon quando o botão é clicado', () => {
    const listaPokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
      'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    renderWithRouter(<App />);

    // botão exibido para passar para o próximo pokémon
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    // repetição para verificação do array de pokemons
    listaPokemons.forEach((e) => {
      expect(screen.getByText(e)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });

  it('3 - Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCorrente = screen.getAllByTestId(/pokemon-name/i);

    expect(pokemonCorrente.length).toEqual(1);
  });

  it('4 - Todos botões de filtros estão sendo renderizados', () => {
    // Criação do array.
    const listFilter = ['Electric', 'Fire',
      'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      // Renderização
    renderWithRouter(<App />);
    // Setando os targets
    const filterRend = screen.getAllByTestId(/pokemon-type-button/i);
    const fireButton = screen.getByRole('button', { name: /fire/i });
    const nextFirePokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const firePokemon = screen.getByTestId('pokemon-type');
    const allSelectorButton = screen.getByRole('button', { name: /all/i });

    /// ////////////////////////////////////////////////////
    // Existe um botão de filtragem para cada tipo de pokémon, sem repetição.
    listFilter.forEach((e, i) => {
      expect(filterRend[i]).toHaveTextContent(e);
    });
    /// ////////////////////////////////////////////////////

    /// ////////////////////////////////////////////////////
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo
    // Selecionando o filtro "Fire"
    userEvent.click(fireButton);
    // Verifica se o pokemon exibido com filtro[Fire] selecionado está correto
    expect(firePokemon).toHaveTextContent('Fire');
    // Passa para o próximo pokémon do filtro( dois existentes )
    userEvent.click(nextFirePokemon);
    // Verifica se o pokemon exibido com filtro[Fire] selecionado está correto
    expect(firePokemon).toHaveTextContent('Fire');
    /// ////////////////////////////////////////////////////

    /// ////////////////////////////////////////////////////
    // O botão All precisa estar sempre visível
    expect(allSelectorButton).toBeInTheDocument();
    /// ////////////////////////////////////////////////////
  });

  it('5 - Pokédex deve renderizar um botão "All" para reser o filtro', () => {
    renderWithRouter(<App />);

    // O texto do botão deve ser All
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toHaveTextContent('All');

    userEvent.click(allButton);

    // por padrão primeiro item da lista quando carregada é Pikachu
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});