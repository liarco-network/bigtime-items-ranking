import { nftTagWeights } from '../data/nftTags';
import { roundRankingValue } from './utils';

export type NftTagRankingOptions = {
  customNftTagWeights?: {
    [name: string]: number;
  };
  failIfUnknown?: boolean;
};

export const getNftTagRanking = (nftTag: string, options?: NftTagRankingOptions): number | null => {
  const nftTagWeight: number | undefined =
    options?.customNftTagWeights?.[nftTag] ?? nftTagWeights[nftTag as keyof typeof nftTagWeights];

  if (options?.failIfUnknown === true && nftTagWeight === undefined) {
    throw new Error(`Unknown NFT tag: ${nftTag}`);
  }

  return nftTagWeight === undefined ? null : roundRankingValue(nftTagWeight);
};
