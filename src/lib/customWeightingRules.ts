import { Item } from '../data/items';

export type CustomWeightingRulesOptions = {
  space_theme__egyptian_theme_weight?: number;
};

type CustomWeightingRules = {
  [name: string]: (item: Item, options?: CustomWeightingRulesOptions) => number | null;
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
  space_theme: (item: Item, customSettings?: CustomWeightingRulesOptions) => {
    if (!item.metadata.tags.includes('space')) {
      return null;
    }

    // TODO: This is just a proof of concept to show how to give a custom weight to the theme of a space
    return item.extra?.attributes?.find((attribute) => attribute.name === 'theme')?.value === 'Evermore'
      ? 15
      : customSettings?.space_theme__egyptian_theme_weight ?? 0;
  },
} as const;
