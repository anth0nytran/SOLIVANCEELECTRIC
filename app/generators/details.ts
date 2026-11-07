// Product detail helpers: slugs, spec tables, and per-line copy.
// Specs come only from the B&S price-list descriptions in ./products — nothing inferred beyond them.

import { formatUsd, productGroups, products, type Product, type ProductGroupId } from './products';

export const isAsco = (p: Product) => p.group.startsWith('asco');
export const brandOf = (p: Product) => (isAsco(p) ? 'ASCO' : 'Briggs & Stratton');
export const fullName = (p: Product) => `${brandOf(p)} ${p.name}`;
export const groupOf = (p: Product) => productGroups.find((g) => g.id === p.group)!;
export const isGenerator = (p: Product) => groupOf(p).kind === 'generator';

export const productSlug = (p: Product) =>
  `${p.name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}-${p.model}`;

export const productHref = (p: Product) => `/generators/${productSlug(p)}`;

export const getProductBySlug = (slug: string) => products.find((p) => productSlug(p) === slug);

export interface SpecRow {
  label: string;
  value: string;
}

export function specRows(p: Product): SpecRow[] {
  const rows: SpecRow[] = [
    { label: 'Brand', value: brandOf(p) },
    { label: 'Model number', value: p.model },
    { label: 'Series', value: groupOf(p).title },
  ];
  const isPP = p.group === 'powerprotect' || p.group === 'powerprotect-dx';

  if (isPP && p.kw) {
    const [lp, ng] = p.kw.replace(' kW', '').split('/').map((s) => s.trim());
    rows.push(
      { label: 'Rated output (LP)', value: `${lp} kW` },
      { label: 'Rated output (NG)', value: `${ng} kW` },
      { label: 'Voltage', value: '120/240V' },
      { label: 'Phase', value: 'Single phase' },
      { label: 'Cooling', value: 'Air-cooled' },
      { label: 'Fuel', value: 'Liquid propane or natural gas' },
      { label: 'Enclosure', value: 'Aluminum' },
      { label: 'Controller', value: p.spec.includes('GC-1033') ? 'GC-1033' : 'GC-1032' },
      {
        label: 'Remote monitoring',
        value: p.spec.includes('EnergyTrak')
          ? 'EnergyTrak ($99/yr subscription after setup)'
          : 'Needs separate EnergyTrak Universal 6943',
      },
    );
  }
  if (p.group === 'fortress' && p.kw) {
    rows.push(
      { label: 'Rated output', value: p.kw },
      { label: 'Phase', value: 'Single phase' },
      { label: 'Cooling', value: 'Liquid-cooled' },
      { label: 'Fuel', value: 'Liquid propane or natural gas' },
      { label: 'Enclosure', value: p.spec.includes('steel') ? 'Steel' : 'Aluminum' },
      { label: 'Block heater', value: 'Included' },
      { label: 'Controller', value: 'Briggs & Stratton controller' },
    );
  }
  if (p.amps) {
    rows.push({ label: 'Rating', value: p.model === '071257' ? 'Dual 200A / split 400A' : `${p.amps}A` });
    const volts = p.spec.match(/(208|240|480)V/)?.[0];
    if (volts) rows.push({ label: 'Voltage', value: volts });
    if (p.phase) rows.push({ label: 'Phase', value: p.phase === 'Three-Phase' ? 'Three phase' : 'Single phase' });
    if (p.spec.includes('2-pole')) rows.push({ label: 'Poles', value: '2-pole' });
    if (p.spec.includes('3-pole')) rows.push({ label: 'Poles', value: '3-pole' });
    if (p.spec.includes('Non-SED')) rows.push({ label: 'Service-entrance rated', value: 'No (installs behind a main disconnect)' });
    else if (p.spec.includes('SED') || p.group === 'bs-transfer' && p.model !== '071212')
      rows.push({ label: 'Service-entrance rated', value: 'Yes (SED)' });
    if (p.spec.includes('TRCM+')) rows.push({ label: 'Load management', value: 'TRCM+ · Symphony Choice compatible' });
    else if (p.spec.includes('Symphony Choice')) rows.push({ label: 'Load management', value: 'Symphony Choice' });
    if (p.spec.includes('Select-circuit')) rows.push({ label: 'Circuits', value: '16 (breakers and whip not included)' });
    rows.push({ label: 'Enclosure', value: 'NEMA 3R outdoor' });
  }
  if (p.group === 'power-management') {
    if (p.spec.includes('NEMA 4')) rows.push({ label: 'Enclosure', value: 'NEMA 4' });
    rows.push({ label: 'Works with', value: 'Symphony Choice transfer switches' });
  }
  if (p.warrantyYears) rows.push({ label: 'Warranty', value: `${p.warrantyYears} years` });
  rows.push({ label: 'Unit price (MAP)', value: formatUsd(p.map) });
  return rows;
}

export const groupDetail: Record<ProductGroupId, { overview: string; bestFor: string[] }> = {
  powerprotect: {
    overview:
      'PowerProtect is the Briggs & Stratton air-cooled home standby line. It runs on natural gas or liquid propane, starts on its own when CenterPoint power drops, and hands the house back to the grid when power returns. The 18, 22, and 26 kW models ship with EnergyTrak, so the unit status shows on your phone.',
    bestFor: [
      'Single-family homes on a 100A to 200A service',
      'Whole-home backup with load management on the AC',
      'Essential-circuit backup on the 13 kW model',
    ],
  },
  'powerprotect-dx': {
    overview:
      'PowerProtect DX is the same air-cooled platform as PowerProtect, sold only through authorized Briggs & Stratton dealers. The difference is the warranty: 10 years in place of 7. Solivance Electric is an authorized dealer and carries the full DX line.',
    bestFor: [
      'Owners who plan to keep the house 10+ years',
      'Whole-home backup on a 100A to 200A service',
      'The longest warranty on an air-cooled unit',
    ],
  },
  fortress: {
    overview:
      'Fortress is the Briggs & Stratton liquid-cooled standby line, 30 kW to 60 kW. A liquid-cooled engine handles long, heavy loads, which matters in a Houston August outage with several AC systems running. Every Fortress unit includes a block heater.',
    bestFor: ['Large homes with two or three AC systems', '400A residential services', 'Light commercial: offices, clinics, small retail'],
  },
  'bs-transfer': {
    overview:
      'The transfer switch moves the house from utility power to the generator and back. Service-entrance rated (SED) switches install at the meter, in place of a separate main disconnect. TRCM+ and Symphony Choice manage big loads so the generator is never overloaded.',
    bestFor: [
      'Pairing with a PowerProtect or Fortress generator',
      'Matching the switch to the service: 100A, 150A, 200A, or 400A',
      'Whole-home installs with AC load management',
    ],
  },
  'power-management': {
    overview:
      'Symphony Choice modules shed and restore large loads (AC compressors, water heaters, pool pumps, EV chargers) based on what the generator can carry. That lets a smaller generator back up the whole house without tripping.',
    bestFor: [
      'Homes with more AC tonnage than the generator can start at once',
      'Adding loads to an existing Symphony Choice install',
      'Keeping generator size down without giving up circuits',
    ],
  },
  'asco-single': {
    overview:
      'ASCO Series 185 and Series 300 Group G transfer switches for single-phase 240V services, 100A to 800A. Non-SED models install behind an existing main disconnect; SED models are rated to install at the service entrance.',
    bestFor: ['Large residential and light commercial single-phase services', 'Projects that specify ASCO switchgear', 'Services above 400A'],
  },
  'asco-three': {
    overview:
      'ASCO Series 185 and Series 300 Group G three-phase transfer switches at 208V, 240V, and 480V, 100A to 400A, for commercial buildings on three-phase service.',
    bestFor: ['Warehouses and light industrial', 'Retail pads and strip centers', 'Medical and dental suites'],
  },
};

/** Generator pages: the B&S switches and power management that pair with it. */
export const pairsWith = (p: Product): Product[] =>
  isGenerator(p) ? products.filter((x) => x.group === 'bs-transfer' || x.model === '6907') : [];

/** Other models in the same line, nearest price first. */
export const siblings = (p: Product, n = 4): Product[] =>
  products
    .filter((x) => x.group === p.group && x.model !== p.model)
    .sort((a, b) => Math.abs(a.map - p.map) - Math.abs(b.map - p.map))
    .slice(0, n);

/** Price range + count for a line, for the line navigator. */
export function groupSummary(id: ProductGroupId) {
  const items = products.filter((x) => x.group === id);
  const prices = items.map((x) => x.map);
  const kws = items.map((x) => x.kw).filter(Boolean) as string[];
  const amps = items.map((x) => x.amps).filter(Boolean) as number[];
  let range = '';
  if (kws.length) {
    const nums = kws.map((k) => parseFloat(k));
    range = `${Math.min(...nums)}–${Math.max(...nums)} kW`;
  } else if (amps.length) {
    range = `${Math.min(...amps)}–${Math.max(...amps)}A`;
  } else {
    range = 'Load management';
  }
  return { count: items.length, from: Math.min(...prices), range, image: items[0]?.image };
}
