import { Item } from '../data/items';
import { Rarity } from '../data/rarities';
import { CustomWeightingRulesOptions, customWeightingRules } from './customWeightingRules';
import { NftTagRankingOptions, getNftTagRanking } from './nftTags';
import { RarityRankingOptions, getRarityRanking } from './rarities';
import { TagRankingOptions, getTagRanking } from './tags';
import { roundRankingValue } from './utils';

const getCustomWeightRankings = (item: Item, options?: CustomWeightingRulesOptions): [string, number | null][] => {
  return Object.entries(customWeightingRules).map(([ruleName, rule]) => {
    try {
      const ranking = rule(item, options);

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

type ItemRankingOptions = RarityRankingOptions &
  TagRankingOptions &
  NftTagRankingOptions & { customWeightingRulesOptions?: CustomWeightingRulesOptions };

export const getItemRanking = (item: Item, options?: ItemRankingOptions): ItemRankingResult => {
  const maxSupply = item.metadata.maxIssuance;
  const rarityRanking = getRarityRanking(item.metadata.rarity, { customRarityWeights: options?.customRarityWeights });
  const tagRankingsData = item.metadata.tags.map(
    (tag) =>
      [tag, getTagRanking(tag, { customTagWeights: options?.customTagWeights, failIfUnknown: options?.failIfUnknown })] as [
        string,
        number,
      ],
  );
  const tagsRanking = tagRankingsData.reduce((ranking, [, currentTagRanking]) => ranking + (currentTagRanking ?? 0), 1);
  const nftTagRankingsData = item.metadata.nftTags.map(
    (nftTag) =>
      [
        nftTag,
        getNftTagRanking(nftTag, {
          customNftTagWeights: options?.customNftTagWeights,
          failIfUnknown: options?.failIfUnknown,
        }),
      ] as [string, number],
  );
  const nftTagsRanking = nftTagRankingsData.reduce(
    (ranking, [, currentNftTagRanking]) => ranking + (currentNftTagRanking ?? 0),
    1,
  );
  const customWeightRankingsData = getCustomWeightRankings(item, options?.customWeightingRulesOptions);
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
