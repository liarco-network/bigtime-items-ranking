import { Item } from '../data/items';

type CustomWeightingRules = {
  [name: string]: (item: Item) => number | null;
};

export const customWeightingRules: CustomWeightingRules = {
  // ------------------------------------------------------
  // Hourglass Remaining Time
  // ------------------------------------------------------
  hourglass_remaining_time: (item: Item) => {
    if (!item.metadata.tags.includes('hourglass')) {
      return null;
    }

    const attributes = item.extra?.attributes ?? [];

    const timeRemaining = Number(
      attributes.find((attribute) => attribute.name === 'TimeRemaining' && attribute.type === 'number')?.value ?? '0',
    );

    // No weight multiplier is applied since this is the most important attribute of an hourglass
    return timeRemaining;
  },

  // ------------------------------------------------------
  // Space theme
  // ------------------------------------------------------
  space_theme: (item: Item) => {
    if (!item.metadata.tags.includes('space')) {
      return null;
    }

    // TODO: This is just a proof of concept to show how to give a custom weight to the "Evermore" theme of a space
    return item.extra?.attributes?.find((attribute) => attribute.name === 'theme')?.value === 'Evermore' ? 15 : 0;
  },
} as const;
