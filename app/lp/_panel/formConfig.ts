import { siteConfig } from '../../config';
import { CONCERNS, PROPERTY_TYPES } from '../../lib/panelOptions';
import { LIGHTING_CONCERNS, LIGHTING_ROLES, LIGHT_COUNTS } from '../../lib/lightingOptions';

// Everything that differs between the landing-page forms. The flow, layout,
// validation and submit/retry logic in PanelLeadForm stay the same for both.

export type LeadFormConfig = {
  /** Sent to /api/panel-lead; picks the answer lists and CRM mapping. */
  offer: 'panel' | 'lighting';
  thankYouPath: string;
  /** Hero card kicker, full-screen header label and dialog name. */
  offerName: string;
  teaserKicker: string;
  concernQuestion: string;
  concerns: readonly string[];
  roleQuestion: string;
  roles: readonly { label: string }[];
  /** Lighting only: "About how many lights?" */
  countQuestion?: string;
  counts?: readonly string[];
  /** Lighting only: optional company / property name field. */
  askCompany?: boolean;
  addressLabel: string;
  descriptionPlaceholder: string;
  submitLabel: string;
  trust: {
    kicker: string;
    headline: string;
    promises: string[];
    quote: string;
    author: string;
    source: 'Google' | 'Thumbtack';
  };
};

export const PANEL_FORM: LeadFormConfig = {
  offer: 'panel',
  thankYouPath: '/lp/panel-inspection/thank-you',
  offerName: 'No-cost panel inspection',
  teaserKicker: 'No-cost panel inspection · takes 30 seconds',
  concernQuestion: 'What’s going on with your panel?',
  concerns: CONCERNS,
  roleQuestion: 'This is for…',
  roles: PROPERTY_TYPES,
  addressLabel: 'Street address',
  descriptionPlaceholder: 'e.g. The breaker for the kitchen trips every night.',
  submitLabel: 'Schedule my inspection',
  trust: {
    kicker: 'No-cost panel inspection',
    headline: 'A licensed electrician checks your panel. You get a written quote.',
    promises: [
      `Licensed Texas electrical contractor, ${siteConfig.license.label}`,
      'Permit pulled and city-inspected on every panel job',
      'Itemized written quote before any work starts',
      'No cost and no obligation',
    ],
    quote: 'They found other issues in the panel that could have caused a fire.',
    author: 'Yeny V.',
    source: 'Google',
  },
};

export const LIGHTING_FORM: LeadFormConfig = {
  offer: 'lighting',
  thankYouPath: '/lp/parking-lot-lighting/thank-you',
  offerName: 'Free lot walk and quote',
  teaserKicker: 'Free lot walk and written quote · takes 30 seconds',
  concernQuestion: 'What does your lot need?',
  concerns: LIGHTING_CONCERNS,
  roleQuestion: 'Your role',
  roles: LIGHTING_ROLES,
  countQuestion: 'About how many lights?',
  counts: LIGHT_COUNTS,
  askCompany: true,
  addressLabel: 'Property address',
  descriptionPlaceholder: 'e.g. Four poles out along the back row since last week.',
  submitLabel: 'Request my quote',
  trust: {
    kicker: 'Commercial parking lot lighting',
    headline: 'We walk the lot, find what’s out, and send a written quote.',
    promises: [
      `Licensed Texas electrical contractor, ${siteConfig.license.label}`,
      'Repairs, LED upgrades and new poles',
      'Work scheduled around your tenants and customers',
      'Itemized written quote before any work starts',
    ],
    quote: 'Despite a busy schedule, Solivance Electric responded promptly and professionally.',
    author: 'Tamika A., salon owner',
    source: 'Thumbtack',
  },
};
