// Google Ads tag settings for the paid landing pages.
//
// Two ways to load the Ads tag, never both, so each conversion is sent exactly
// once: a GTM container (NEXT_PUBLIC_GTM_ID) that holds the Ads tag, or — when
// there is no container — gtag.js loaded directly with the IDs below.

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // AW-…
const LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL; // "Website Lead" conversion

export const ADS_DIRECT = !GTM_ID && !!GOOGLE_ADS_ID;
export const LEAD_SEND_TO = ADS_DIRECT && LEAD_LABEL ? `${GOOGLE_ADS_ID}/${LEAD_LABEL}` : undefined;
