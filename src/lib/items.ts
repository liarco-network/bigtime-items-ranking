import { Item } from '../data/items';
import { Rarity } from '../data/rarities';
import { customWeightingRules } from './customWeightingRules';
import { getNftTagRanking } from './nftTags';
import { getRarityRanking } from './rarities';
import { getTagRanking } from './tags';
import { roundRankingValue } from './utils';

const getCustomWeightRankings = (item: Item): [string, number | null][] => {
  return Object.entries(customWeightingRules).map(([ruleName, rule]) => {
    try {
      const ranking = rule(item);

      return [ruleName, ranking === null ? null : roundRankingValue(ranking)];
    } catch (error) {
      throw new Error(`Error while calculating custom weight ranking for "${ruleName}": ${error}`);
    }
  });
};

type ItemRankingResult = [
  ranking: number,
  data: {
    maxSupply: number;
    rarityRankingData: [rarity: Rarity, ranking: number];
    tagRankingsData: [tag: string, ranking: number][];
    nftTagRankingsData: [nftTag: string, ranking: number][];
    customWeightRankingsData: [ruleName: string, ranking: number | null][];
  },
];

export const getItemRanking = (item: Item): ItemRankingResult => {
  const maxSupply = item.metadata.maxIssuance;
  const rarityRanking = getRarityRanking(item.metadata.rarity);
  const tagRankingsData = item.metadata.tags.map((tag) => [tag, getTagRanking(tag)] as [string, number]);
  const tagsRanking = tagRankingsData.reduce((ranking, [, currentTagRanking]) => ranking + (currentTagRanking ?? 0), 1);
  const nftTagRankingsData = item.metadata.nftTags.map((nftTag) => [nftTag, getNftTagRanking(nftTag)] as [string, number]);
  const nftTagsRanking = nftTagRankingsData.reduce(
    (ranking, [, currentNftTagRanking]) => ranking + (currentNftTagRanking ?? 0),
    1,
  );
  const customWeightRankingsData = getCustomWeightRankings(item);
  const customWeightRanking = customWeightRankingsData.reduce(
    (ranking, [, currentRanking]) => ranking + (currentRanking ?? 0),
    1,
  );
  const itemRanking = (rarityRanking / maxSupply) * (tagsRanking + nftTagsRanking) * customWeightRanking;

  return [
    roundRankingValue(itemRanking),
    {
      maxSupply,
      rarityRankingData: [item.metadata.rarity, rarityRanking],
      tagRankingsData,
      nftTagRankingsData,
      customWeightRankingsData,
    },
  ];
};
