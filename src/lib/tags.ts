import { tagWeights } from '../data/tags';
import { roundRankingValue } from './utils';

type TagRankingOptions = {
  customTagWeights?: {
    [name: string]: number;
  };
  failIfUnknown?: boolean;
};

export const getTagRanking = (tag: string, options?: TagRankingOptions): number | null => {
  const tagWeight: number | undefined = options?.customTagWeights?.[tag] ?? tagWeights[tag as keyof typeof tagWeights];

  if (options?.failIfUnknown === true && tagWeight === undefined) {
    throw new Error(`Unknown tag: ${tag}`);
  }

  return tagWeight === undefined ? null : roundRankingValue(tagWeight);
};
