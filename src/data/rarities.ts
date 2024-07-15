/*
 * The item with the highest max supply is the Common Hourglass with  600,000
 * items. Based on this value I think it's reasonable to assume that a fair
 * value for the Common rarity weight is 1,000,000. All other rarities are
 * weighted adding 1M to the previous ratity.
 */
const WEIGHT_BASELINE = 1_000_000;

export const rarityWeights = {
  common: 1 * WEIGHT_BASELINE,
  uncommon: 2 * WEIGHT_BASELINE,
  rare: 3 * WEIGHT_BASELINE,
  epic: 4 * WEIGHT_BASELINE,
  legendary: 5 * WEIGHT_BASELINE,
  mythic: 6 * WEIGHT_BASELINE,
  exalted: 7 * WEIGHT_BASELINE,
  exotic: 8 * WEIGHT_BASELINE,
  transcendent: 9 * WEIGHT_BASELINE,
  unique: 10 * WEIGHT_BASELINE,
} as const;

export const knownRarities = Object.keys(rarityWeights);

export type Rarity = keyof typeof rarityWeights;
