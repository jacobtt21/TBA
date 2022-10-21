import { Magic } from 'magic-sdk';

const polygonNodeOptions = {
  rpcUrl: 'https://polygon-mainnet.infura.io/v3/60bdb9f399554311a48b69ff2faefc8f',
  chainId: 137,
};

const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      network: polygonNodeOptions
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
