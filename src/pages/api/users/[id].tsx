import { NextApiRequest, NextApiResponse } from 'next';

// JWT (Storage)
// Next Auth (Social)
// Cognito (AWS), Auth0

export default (request: NextApiRequest, response: NextApiResponse) => {
  // console.log(request.query);
  const id = request.query;

  const users = [
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Libero' },
    { id: 3, name: 'Caio' },
  ];

  return response.json(users);
};

// Serverless
