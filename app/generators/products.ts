// Briggs & Stratton standby generator + transfer switch lineup.
// Source: Highlighted_Prices.xlsx (B&S MAP price list, effective 2026-07-23).
// Prices are MAP (minimum advertised price) for the equipment only — installation is quoted separately.

export const PRICE_LIST_EFFECTIVE = '2026-07-23';

/** Quote-form service options for generator buyers: [with install, unit only]. */
export const GENERATOR_SERVICES = ['Generator Purchase + Install (Briggs & Stratton)', 'Generator Purchase Only (Briggs & Stratton)'];

export type ProductGroupId =
  | 'powerprotect'
  | 'fortress'
  | 'bs-transfer'
  | 'power-management'
  | 'asco-single'
  | 'asco-three';

export interface Product {
  model: string;
  name: string;
  /** Short spec line shown under the name. */
  spec: string;
  group: ProductGroupId;
  phase?: 'Single Phase' | 'Three-Phase';
  kw?: string;
  amps?: number;
  warrantyYears?: number;
  map: number;
  image: string;
  badge?: string;
  /** Add-on note shown under the price. */
  note?: string;
}

export interface ProductGroup {
  id: ProductGroupId;
  title: string;
  kicker: string;
  blurb: string;
  kind: 'generator' | 'switch' | 'accessory';
}

const img = (name: string) => `/generators/${name}`;

export const productGroups: ProductGroup[] = [
  {
    id: 'powerprotect',
    kind: 'generator',
    kicker: 'Air-cooled · LP / NG',
    title: 'PowerProtect Series',
    blurb:
      'Home standby from 13 kW to 26 kW. 120/240V single phase, aluminum enclosure. The 18, 22, and 26 kW units ship with EnergyTrak monitoring.',
  },
  {
    id: 'fortress',
    kind: 'generator',
    kicker: 'Liquid-cooled · LP / NG',
    title: 'Fortress Series',
    blurb:
      'Liquid-cooled standby from 30 kW to 60 kW for large homes, light commercial, and anything carrying multiple 5-ton AC units. Block heater included.',
  },
  {
    id: 'bs-transfer',
    kind: 'switch',
    kicker: 'Service-entrance rated',
    title: 'Briggs & Stratton Transfer Switches',
    blurb:
      'SED automatic transfer switches with TRCM+ power management, NEMA 3R outdoor rated. Sized to the service: 100A, 150A, 200A, or dual 200A / split 400A.',
  },
  {
    id: 'power-management',
    kind: 'accessory',
    kicker: 'Load management',
    title: 'Symphony Choice Power Management',
    blurb:
      'Modules that shed and restore big loads — AC compressors, water heaters, pool pumps — so a smaller generator carries the whole house without overloading.',
  },
  {
    id: 'asco-single',
    kind: 'switch',
    kicker: '240V single phase',
    title: 'ASCO Transfer Switches · Single Phase',
    blurb:
      'ASCO Series 185 and Series 300 Group G, 100A through 800A. Non-SED for installs behind a main disconnect; SED versions for service-entrance installs.',
  },
  {
    id: 'asco-three',
    kind: 'switch',
    kicker: '208V · 240V · 480V three phase',
    title: 'ASCO Transfer Switches · Three Phase',
    blurb:
      'Commercial three-phase transfer switches, 100A through 400A, for warehouses, retail pads, and medical suites.',
  },
];

const pp = (size: '13' | '18' | '22' | '26') => img(`pp${size}.jpg`);
const energyTrakNote = 'EnergyTrak monitoring subscription: $99/yr, billed after setup.';

export const products: Product[] = [
  // ── PowerProtect ──
  { model: '040746', group: 'powerprotect', name: 'PowerProtect PP13', kw: '13 / 11.5 kW', spec: '13/11.5 kW (LP/NG) · 120/240V · GC-1032 controller', phase: 'Single Phase', warrantyYears: 7, map: 4535, image: pp('13'), note: 'Monitoring needs the separate EnergyTrak Universal 6943.' },
  { model: '040757', group: 'powerprotect', name: 'PowerProtect PP18+', kw: '18 / 18 kW', spec: '18/18 kW (LP/NG) · 120/240V · GC-1033 controller · EnergyTrak', phase: 'Single Phase', warrantyYears: 7, map: 6017, image: pp('18'), badge: 'New', note: energyTrakNote },
  { model: '040787', group: 'powerprotect', name: 'PowerProtect PP22+', kw: '22 / 22 kW', spec: '22/22 kW (LP/NG) · 120/240V · GC-1033 controller · EnergyTrak', phase: 'Single Phase', warrantyYears: 7, map: 6406, image: pp('22'), note: energyTrakNote },
  { model: '040807', group: 'powerprotect', name: 'PowerProtect PP26+', kw: '26 / 24 kW', spec: '26/24 kW (LP/NG) · 120/240V · GC-1033 controller · EnergyTrak', phase: 'Single Phase', warrantyYears: 7, map: 7195, image: pp('26'), badge: 'New', note: energyTrakNote },

  // ── Fortress (liquid-cooled) ──
  { model: '076880', group: 'fortress', name: 'Fortress 30 kW', kw: '30 kW', spec: 'Liquid-cooled · steel enclosure · block heater · B&S controller', phase: 'Single Phase', warrantyYears: 6, map: 14624, image: img('fortress-30.jpg') },
  { model: '076830', group: 'fortress', name: 'Fortress 35 kW', kw: '35 kW', spec: 'Liquid-cooled · aluminum enclosure · block heater · B&S controller', phase: 'Single Phase', warrantyYears: 6, map: 19917, image: img('fortress-35.jpg') },
  { model: '076850', group: 'fortress', name: 'Fortress 48 kW', kw: '48 kW', spec: 'Liquid-cooled · aluminum enclosure · block heater · B&S controller', phase: 'Single Phase', warrantyYears: 6, map: 23236, image: img('fortress-48.jpg') },
  { model: '076860', group: 'fortress', name: 'Fortress 60 kW', kw: '60 kW', spec: 'Liquid-cooled · aluminum enclosure · block heater · B&S controller', phase: 'Single Phase', warrantyYears: 6, map: 27277, image: img('fortress-60.jpg') },

  // ── Briggs & Stratton transfer switches ──
  { model: '071210', group: 'bs-transfer', name: '100A SED Transfer Switch', amps: 100, spec: 'TRCM+ power management · NEMA 3R · Symphony Choice compatible', phase: 'Single Phase', warrantyYears: 7, map: 799, image: img('sed-transfer-switch.jpg') },
  { model: '071250', group: 'bs-transfer', name: '150A SED Transfer Switch', amps: 150, spec: 'TRCM+ power management · NEMA 3R · Symphony Choice compatible', phase: 'Single Phase', warrantyYears: 7, map: 883, image: img('sed-transfer-switch.jpg') },
  { model: '071270', group: 'bs-transfer', name: '200A SED Transfer Switch', amps: 200, spec: 'TRCM+ power management · NEMA 3R · Symphony Choice compatible', phase: 'Single Phase', warrantyYears: 7, map: 883, image: img('sed-transfer-switch.jpg') },
  { model: '071257', group: 'bs-transfer', name: 'Dual 200A / Split 400A SED Switch', amps: 400, spec: 'Symphony Choice power management · single phase · NEMA 3R', phase: 'Single Phase', map: 2171, image: img('symphony-dual-200.jpg'), badge: '400A service' },
  { model: '071212', group: 'bs-transfer', name: '100A 16-Circuit Transfer Switch', amps: 100, spec: 'Select-circuit · NEMA 3R · no breakers or whip · not for pre-2019 units', phase: 'Single Phase', warrantyYears: 5, map: 771, image: img('select-circuit-switch.jpg') },

  // ── Power management ──
  { model: '6907', group: 'power-management', name: 'Symphony Choice Power Management', spec: 'Load-management controller for Symphony Choice switches', map: 140, image: img('symphony-module.jpg') },
  { model: '071051', group: 'power-management', name: 'Line Voltage Module (50A)', spec: 'For Symphony Choice switches · NEMA 4 · sheds 240V loads', warrantyYears: 3, map: 160, image: img('symphony-module.jpg') },
  { model: '071052', group: 'power-management', name: 'Low Voltage Module · AC Control', spec: 'For Symphony Choice switches · NEMA 4 · air conditioner control', warrantyYears: 3, map: 114, image: img('symphony-module.jpg') },
  { model: '071053', group: 'power-management', name: 'Low Voltage Dual Module', spec: 'For Symphony Choice switches · NEMA 4 · two AC systems', warrantyYears: 3, map: 137, image: img('symphony-module.jpg') },

  // ── ASCO single phase ──
  { model: '071097', group: 'asco-single', name: 'ASCO 185 · 100A', amps: 100, spec: 'Series 185 · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 2, map: 1774, image: img('asco-185.jpg') },
  { model: '071105', group: 'asco-single', name: 'ASCO 185 · 200A', amps: 200, spec: 'Series 185 · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 2185, image: img('asco-185.jpg') },
  { model: '071111', group: 'asco-single', name: 'ASCO 185 · 400A', amps: 400, spec: 'Series 185 · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 3856, image: img('asco-185.jpg') },
  { model: '071170', group: 'asco-single', name: 'ASCO 300 · 200A', amps: 200, spec: 'Series 300 Group G · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 3055, image: img('asco-300.jpg') },
  { model: '071175', group: 'asco-single', name: 'ASCO 300 · 400A', amps: 400, spec: 'Series 300 Group G · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 4249, image: img('asco-300.jpg') },
  { model: '071183', group: 'asco-single', name: 'ASCO 300 · 600A', amps: 600, spec: 'Series 300 Group G · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 6820, image: img('asco-300.jpg') },
  { model: '071188', group: 'asco-single', name: 'ASCO 300 · 800A', amps: 800, spec: 'Series 300 Group G · 240V 2-pole · Non-SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 9157, image: img('asco-300.jpg') },
  { model: '071138', group: 'asco-single', name: 'ASCO 300 SED · 200A', amps: 200, spec: 'Series 300 Group G · 240V 2-pole · SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 7843, image: img('asco-300.jpg') },
  { model: '071139', group: 'asco-single', name: 'ASCO 300 SED · 400A', amps: 400, spec: 'Series 300 Group G · 240V 2-pole · SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 10054, image: img('asco-300.jpg') },
  { model: '071140', group: 'asco-single', name: 'ASCO 300 SED · 600A', amps: 600, spec: 'Series 300 Group G · 240V 2-pole · SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 14043, image: img('asco-300.jpg') },
  { model: '071133', group: 'asco-single', name: 'ASCO 300 SED · 800A', amps: 800, spec: 'Series 300 Group G · 240V 2-pole · SED · NEMA 3R', phase: 'Single Phase', warrantyYears: 3, map: 16822, image: img('asco-300.jpg') },

  // ── ASCO three phase ──
  { model: '071098', group: 'asco-three', name: 'ASCO 185 · 100A · 208V', amps: 100, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 1855, image: img('asco-185.jpg') },
  { model: '071099', group: 'asco-three', name: 'ASCO 185 · 100A · 240V', amps: 100, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 1855, image: img('asco-185.jpg') },
  { model: '071103', group: 'asco-three', name: 'ASCO 185 · 100A · 480V', amps: 100, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 1855, image: img('asco-185.jpg') },
  { model: '071106', group: 'asco-three', name: 'ASCO 185 · 200A · 208V', amps: 200, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 2227, image: img('asco-185.jpg') },
  { model: '071107', group: 'asco-three', name: 'ASCO 185 · 200A · 240V', amps: 200, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 2227, image: img('asco-185.jpg') },
  { model: '071109', group: 'asco-three', name: 'ASCO 185 · 200A · 480V', amps: 200, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 2227, image: img('asco-185.jpg') },
  { model: '071112', group: 'asco-three', name: 'ASCO 185 · 400A · 208V', amps: 400, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 4125, image: img('asco-185.jpg') },
  { model: '071113', group: 'asco-three', name: 'ASCO 185 · 400A · 240V', amps: 400, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 4125, image: img('asco-185.jpg') },
  { model: '071115', group: 'asco-three', name: 'ASCO 185 · 400A · 480V', amps: 400, spec: 'Series 185 · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 4125, image: img('asco-185.jpg') },
  { model: '071165', group: 'asco-three', name: 'ASCO 300 · 100A · 208V', amps: 100, spec: 'Series 300 Group G · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 2703, image: img('asco-300.jpg') },
  { model: '071166', group: 'asco-three', name: 'ASCO 300 · 100A · 240V', amps: 100, spec: 'Series 300 Group G · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 2703, image: img('asco-300.jpg') },
  { model: '071169', group: 'asco-three', name: 'ASCO 300 · 100A · 480V', amps: 100, spec: 'Series 300 Group G · 3-pole · Non-SED · NEMA 3R', phase: 'Three-Phase', warrantyYears: 3, map: 2703, image: img('asco-300.jpg') },
];

export const formatUsd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const productsIn = (group: ProductGroupId) => products.filter((p) => p.group === group);
