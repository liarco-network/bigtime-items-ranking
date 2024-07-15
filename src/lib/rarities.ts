import { Rarity, rarityWeights } from '../data/rarities';
import { roundRankingValue } from './utils';

type RarityRankingOptions = {
  customRarityWeights?: {
    [name: string]: number;
  };
};

export const getRarityRanking = (rarity: Rarity, options?: RarityRankingOptions): number => {
  const rarityWeight: number | undefined =
    options?.customRarityWeights?.[rarity] ?? rarityWeights[rarity as keyof typeof rarityWeights];

  if (rarityWeight === undefined) {
    throw new Error(`Unknown rarity: ${rarity}`);
  }

  return roundRankingValue(rarityWeight);
};
