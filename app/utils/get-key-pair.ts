'use server';

import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import 'dotenv/config';

const getKeyPair = async () => {
  const keyPair = await getKeypairFromEnvironment('SECRET_KEY');
  return JSON.parse(JSON.stringify(keyPair));
};

export { getKeyPair };
