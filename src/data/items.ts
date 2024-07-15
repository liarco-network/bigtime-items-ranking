import { Rarity } from './rarities';

export type ItemAttribute = {
  name: string;
  type: 'string' | 'number' | 'date';
  display: string;
  searchable: boolean;
};

export type ItemAttributeValue = {
  name: string;
  value: string;
  type: 'string' | 'number' | 'date';
  display: string;
};

export type Item = {
  id: string;
  issuedId: number;
  sellableAt: string;
  status: 'locked' | 'sold';
  extra: {
    attributes?: ItemAttributeValue[];
    imageUrl?: string;
    description?: string;
    wrapped?: boolean;
    withdrawableDate?: string;
  } | null;
  metadata: {
    archetypeId: string;
    name: string;
    description: string;
    tags: string[];
    nftTags: string[];
    rarity: Rarity;
    imageUrl: string;
    collection: string;
    optionName: string;
    maxIssuance: number;
    rentable: boolean;
    sellable: boolean;
    wrappable: boolean;
    creditCardBlocked: boolean;
    attributes?: ItemAttribute[];
    game: {
      id: string;
      name: string;
    };
  };
};
