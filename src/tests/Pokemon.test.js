import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import listaPokemons from '../data';

describe('Testa o componente <Pokemon.js />', () => {
  test('1 - Renderiza um card com as informações de determinado pokémon:', () => {
    // escolhido o Pikachu para ser o card testado
    const pikachu = listaPokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pikachu;
    renderWithRouter(<App />);
    // Nome do card
    const pokeName = screen.getByTestId(/pokemon-name/i);
    expect(pokeName).toHaveTextContent(name);
    // Tipo do card
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(type);
    // Pesos e unidades de medidas do card
    const pokeWeight = screen.getByTestId(/pokemon-weight/i);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    // Imagem e alt do card
    const imagePoke = screen.getByAltText(`${name} sprite`);
    expect(imagePoke.src).toContain(image);
  });

  it(
    '2 - O endereço com id do pokemon é o mesmo do pokemon selecionado no MoreDetails',
    () => {
      const charmander = listaPokemons[1];
      const { id } = charmander;
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push(`/pokemons/${id}`);
      });

      const charmanderTitle = screen.getByRole('heading', {
        name: /charmander details/i, level: 2 });
      expect(charmanderTitle).toBeInTheDocument();
    },
  );

  it('3 - Se "More Details" for clicado,o pathname é mesmo id do pokemon exibido', () => {
    // escolhido o pikachu para ser testado
    const pikachu = listaPokemons[0];
    // desestruturo o id dele [25]
    const { id } = pikachu;
    // separo do history
    const { history } = renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkToDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('4 - O pokemon favorita exibe um estrela no card', () => {
    renderWithRouter(<App />);

    const detailsPika = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsPika);
    // favoritando o pokémon
    const labelFavPika = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(labelFavPika);

    const imageStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imageStar.src).toContain('star-icon.svg');
  });
});