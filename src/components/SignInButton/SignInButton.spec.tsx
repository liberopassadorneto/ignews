import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    const { debug } = render(<SignInButton />);

    // debug();

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      },
      false,
    ]);

    const { debug } = render(<SignInButton />);

    // debug();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
