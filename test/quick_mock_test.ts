import { sampleItems } from './data/quick_mock_test/sampleItems';
import { getItemRanking } from '../src';
import { commonHourglassListings, mythicHourglassListings, rareHourglassListings } from './data/quick_mock_test/hgListings';
import {
  epicMediumSpaceListings,
  epicSmallSpaceListings,
  rareMediumSpaceListings,
} from './data/quick_mock_test/spaceListings';

describe('Quick Mock Test', () => {
  describe('getItemRanking()', () => {
    const rankings = sampleItems.map((item) => {
      return [item.metadata.name, ...getItemRanking(item)];
    }) as [string, number, ReturnType<typeof getItemRanking>[1]][];

    it('Item rankings', () => {
      console.table(
        rankings.map((ranking) => ({
          Item: ranking[0],
          Ranking: ranking[1],
          'Max supply': ranking[2].maxSupply,
          Rarity: ranking[2].rarityRankingData[0],
          'Rarity ranking': ranking[2].rarityRankingData[1],
        })),
      );
    });

    it('Ranking details', () => {
      rankings.forEach(([item, ranking, data]) => {
        console.log(`\nItem: ${item} (ranking: ${ranking})`);
        console.table(data.tagRankingsData.map((tagData) => ({ Tag: tagData[0], Ranking: tagData[1] })));
        console.table(data.nftTagRankingsData.map((nftTagData) => ({ 'NFT tag': nftTagData[0], Ranking: nftTagData[1] })));
        console.table(
          data.customWeightRankingsData.map((customWeightData) => ({
            'Rule name': customWeightData[0],
            Ranking: customWeightData[1],
          })),
        );
      });
    });
  });

  describe('Hourglasses', () => {
    const rankings = [...commonHourglassListings, ...rareHourglassListings, ...mythicHourglassListings].map((listing) => {
      return [
        `${listing.item.metadata.name} #${listing.item.issuedId} (${
          listing.item.extra?.attributes?.find((attribute) => attribute.name === 'TimeRemaining')?.value ?? 0
        } minutes))`,
        ...getItemRanking(listing.item),
      ];
    }) as [string, number, ReturnType<typeof getItemRanking>[1]][];

    it('HG rankings', () => {
      console.table(
        rankings.map((ranking) => ({ Item: ranking[0], Rarity: ranking[2].rarityRankingData[0], Ranking: ranking[1] })),
      );
    });
  });

  describe('Spaces', () => {
    const rankings = [...rareMediumSpaceListings, ...epicSmallSpaceListings, ...epicMediumSpaceListings].map((listing) => {
      return [`${listing.item.metadata.name} #${listing.item.issuedId}`, ...getItemRanking(listing.item)];
    }) as [string, number, ReturnType<typeof getItemRanking>[1]][];

    it('Space rankings', () => {
      console.table(
        rankings.map((ranking) => ({ Item: ranking[0], Rarity: ranking[2].rarityRankingData[0], Ranking: ranking[1] })),
      );
    });
  });
});
