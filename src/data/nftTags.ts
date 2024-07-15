export const nftTagWeights = {
  'NFT.Cosmetic.Season.Origin': 3,
  'NFT.Cosmetic.Season.PreSeason': 2,
  'NFT.Cosmetic.Craftable': 10,
  'NFT.Cosmetic.CraftableSpeciale': 5,
  'NFT.Cosmetic.Armor.Shield': 1,
  'NFT.Cosmetic.Color.Red': 2,
  'NFT.Cosmetic.Color.Green': 2,
  'NFT.Cosmetic.Theme.Christmas2023': 5,
} as const;

export const knownNftTags = Object.keys(nftTagWeights);
