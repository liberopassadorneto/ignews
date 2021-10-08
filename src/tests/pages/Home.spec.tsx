import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock('../../services/stripe');

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-priceid', amount: '$10.00' }} />);

    // debug();

    expect(screen.getByText('for $10.00 month')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-priceid',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    // console.log(response);
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-priceid',
            amount: '$10.00',
          },
        },
      })
    );
  });
});
