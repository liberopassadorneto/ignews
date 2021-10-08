import { render, screen } from '@testing-library/react';
import React from 'react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('ActiveLink Component', () => {
  it('renders correctly', () => {
    const { debug, getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    // debug();

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('adds activeClass if the link as currently active', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    // debug();

    expect(screen.getByText('Home')).toHaveClass('active');
  });
});
