import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Testa o componente "<FavoritePokemons.js />"', () => {
  test('1 - Verifica se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundFav = screen.queryByText(/no favorite pokemon found/i);
    expect(notFoundFav).toBeInTheDocument();
  });

  it('2 - Verifica se o pokémon favoritado aparece na pagina de favoritos', () => {
    renderWithRouter(<App />);
    // verifação do link que mostrar mais  detalhes sobre o pokémon
    const linkMore = screen.getByRole('link', { name: /more details/i });
    // click no link
    userEvent.click(linkMore);
    // favoritando o pokémon
    const labelCheck = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(labelCheck);
    // indo para página dos favoritos
    const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkToFavorite);
    // verificação da quantidade de pokemons favoritos adicionada;
    const favorites = screen.getAllByTestId(/pokemon-name/i);

    expect(favorites.length).toEqual(1);
  });
});