export const tagWeights = {
  craftable: 100,
  armor: 20,
  shield: 2,
  space: 300,
  small: 10,
  medium: 20,
  large: 30,
} as const;

export const knownTags = Object.keys(tagWeights);
