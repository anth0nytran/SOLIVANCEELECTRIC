// Search-facing title / H1 / meta description per service page.
//
// Why this exists: service pages were titled "<Service> in Greater Houston" with an H1 of
// just "<Service>" and a meta description with no city, brand, or call to action. Nobody
// searches "Greater Houston"; Search Console (May–Nov 2026) shows people search
// "<service> houston", "<service> near me", "warehouse electrical contractor",
// "soffit lighting installation near me". These lines put the searched words first.
//
// Titles are absolute (no "| Solivance Electric LLC" template suffix) so they stay under
// ~60 characters and don't get cut off in results.

export interface ServiceSeo {
  title: string;
  h1: string;
  description: string;
}

export const serviceSeo: Record<string, ServiceSeo> = {
  'panel-upgrades': {
    title: 'Electrical Panel Upgrade & Replacement in Houston, TX',
    h1: 'Electrical Panel Upgrades & Replacement in Houston',
    description:
      'Licensed Houston electrician for panel upgrades and replacements: 100A to 200A+ homes, 3-phase commercial service, Federal Pacific and Zinsco swaps. Permits and CenterPoint handled. Financing available. (832) 965-9964.',
  },
  'generator-installs': {
    title: 'Standby Generator Installation in Houston, TX',
    h1: 'Standby Generator Installation in Houston',
    description:
      'Whole-home and commercial standby generator installs in Houston with automatic transfer switch, permit, and startup. Licensed electrician TECL #41163. Financing available. Call (832) 965-9964.',
  },
  'parking-lot-lighting': {
    title: 'Parking Lot Lighting Repair & LED Retrofits | Houston',
    h1: 'Parking Lot Lighting Repair, Installation & LED Retrofits in Houston',
    description:
      'Parking lot lights out? Houston commercial electrician for pole light repair, new poles, and LED retrofits for retail centers, churches, offices, and HOAs. Free lot audit, licensed TECL #41163. (832) 965-9964.',
  },
  'ev-chargers': {
    title: 'EV Charger Installation in Houston, TX | Home & Commercial',
    h1: 'EV Charger Installation in Houston',
    description:
      'Level 2 and Tesla Wall Connector installs for Houston homes, plus multi-port EV charging for offices and retail. Panel capacity checked, permit pulled. Licensed electrician. (832) 965-9964.',
  },
  'commercial-warehouses': {
    title: 'Warehouse Electrical Contractor in Houston, TX',
    h1: 'Warehouse & Distribution Center Electrical Contractor in Houston',
    description:
      'New warehouse and distribution center electrical in Houston: service and switchgear, high-bay LED, dock and door power, tenant build-outs. Licensed commercial electrical contractor TECL #41163. (832) 965-9964.',
  },
  pedestals: {
    title: 'RV Park Pedestal Installation in Houston, TX',
    h1: 'RV Park Electrical Pedestal Installation in Houston',
    description:
      'RV park and campground electrical pedestals installed in the Houston area: 30A and 50A pedestals, feeders, and trenching. Licensed Texas electrical contractor. Call (832) 965-9964.',
  },
  'mobile-home-connections': {
    title: 'Mobile Home Electrical Hookup in Houston, TX',
    h1: 'Mobile Home Electrical Hookups in Houston',
    description:
      'Mobile and manufactured home electrical hookups in the Houston area: service disconnect, feeder, and grounding, permitted and inspected. Licensed electrician. Call (832) 965-9964.',
  },
  'home-builds': {
    title: 'New Home Electrical Wiring in Houston | Builders',
    h1: 'New Home Electrical for Houston Builders: Single & Multi-Family',
    description:
      'Electrical rough-in through final for new single-family and multi-family builds in Houston. Builder schedules met, permits and inspections handled. Licensed contractor TECL #41163. (832) 965-9964.',
  },
  'commercial-centers': {
    title: 'Shopping Center & Retail Electrical Contractor | Houston',
    h1: 'Shopping Center & Retail Electrical Contractor in Houston',
    description:
      'Electrical for new shopping centers, strip centers, and retail tenant finish-out in Houston: service, house panels, site and parking lighting. Licensed commercial electrician. (832) 965-9964.',
  },
  'soffit-lighting': {
    title: 'Soffit & Under-Eave Lighting Installation in Houston',
    h1: 'Soffit & Under-Eave Lighting Installation in Houston',
    description:
      'Recessed soffit and under-eave LED lighting installed on Houston homes and businesses, on a switch, timer, or photocell. Licensed electrician, clean install. Call (832) 965-9964.',
  },
};
