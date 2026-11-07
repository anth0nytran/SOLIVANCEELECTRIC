// Partner brand assets and the one approved financing line.
// Keep financing copy free of rates, terms, or payment amounts (Reg Z trigger terms).

export const brands = {
  briggs: {
    name: 'Briggs & Stratton',
    logo: '/generators/logo-briggs-stratton-color.png',
    dealerLabel: 'Authorized Briggs & Stratton Dealer',
  },
  synchrony: {
    name: 'Synchrony',
    logo: '/generators/logo-synchrony.svg',
  },
} as const;

export const financing = {
  headline: 'Financing available through Synchrony',
  sub: 'Ask about monthly payment options.',
  disclaimer: 'Subject to credit approval.',
  /** One-line version for bars and badges. */
  short: 'Financing available · Ask about monthly payment options',
} as const;
