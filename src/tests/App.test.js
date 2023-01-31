import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente "<App.js />"', () => {
  test('1 - Verifica se o links estão sendo renderizados', () => {
    renderWithRouter(<App />);
    // Link Home está sendo exibido
    const linkToHome = screen.getByRole('link', { name: /home/i });
    expect(linkToHome).toBeInTheDocument();
    // Link About está sendo exibido
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    expect(linkToAbout).toBeInTheDocument();
    // Link Favorite está sendo exibido
    const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkToFavorite).toBeInTheDocument();
  });

  it('2 - Verifica se ao clicar no "Home" a pagina é rederecionada a "/"', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkToHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('3 - Verifica se ao clicar no "About" a pagina é rederecionada a "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkToAbout);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it(
    '4 - Verifica se ao clicar no "Favorite " a pagina é rederecionada a "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkToFavorite);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    },
  );

  it(
    ' 5 - Verifica se ir ao endereço não determinado',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('pagina-nao-existe');
      });

      const NotFound = screen.getByRole('heading', { name: /page requested not found/i });
      expect(NotFound).toBeInTheDocument();
    },
  );
});