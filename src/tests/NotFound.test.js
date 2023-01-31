import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import NotFound from '../pages/NotFound';

describe('Testa o componente "<NotFound.js />"', () => {
  test('1 - Contém um heading h2 com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('pagina-nao-existe');
    });

    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  it('2 - A página mostra uma imagem já determinada', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const linkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image.src).toContain(linkImage);
  });
});