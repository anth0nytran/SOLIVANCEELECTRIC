import { Resend } from 'resend';
import { siteConfig } from '../config';
import { LP_PHONE, LP_PHONE_TEL } from '../lp/_panel/phone';

// Branded "request received" email for the Google Ads landing-page leads.
// Replies go to the service inbox, so a lead who'd rather email than text can
// just hit reply. Best effort: a failed send never fails the lead.

const REPLY_TO = 'service@solivanceelectric.com';
const NAVY = '#0A1322';
const ORANGE = '#E8590C';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type ConfirmInput = {
  name: string;
  email: string;
  offer: 'panel' | 'lighting';
  address: string;
  timeline: string;
};

export async function sendLpConfirmEmail(input: ConfirmInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return;

  const from = process.env.LEAD_FROM_EMAIL || 'Solivance Electric LLC <leads@solivanceelectric.com>';
  const first = (input.name.split(/\s+/)[0] || 'there').replace(/[^\p{L}\-']/gu, '') || 'there';
  const what = input.offer === 'lighting' ? 'free lot lighting audit' : 'no-cost panel inspection';
  const next =
    input.offer === 'lighting'
      ? 'We’ll call to set up the lot walk. We check every pole and quote it two ways: fix what’s out, or switch the lot to LED.'
      : 'We’ll call to set a time for a licensed electrician to check your panel and give you a straight answer.';

  const text = [
    `Hi ${first},`,
    '',
    `Thanks for requesting a ${what} from ${siteConfig.businessName}. We got it.`,
    '',
    next,
    '',
    `The call comes from ${LP_PHONE}. Save it so it doesn’t show up as unknown.`,
    '',
    `Rather email? Just reply to this message and it reaches our team at ${REPLY_TO}.`,
    '',
    `Address: ${input.address}`,
    `Timeline: ${input.timeline}`,
    '',
    `— ${siteConfig.businessName} · ${siteConfig.license.label}`,
  ].join('\n');

  const html = `
  <div style="background:#eef1f5;padding:24px 12px;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${NAVY};">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #d9dde3;border-radius:14px;overflow:hidden;">
      <tr><td style="background:${NAVY};padding:22px 24px;border-bottom:4px solid ${ORANGE};text-align:center;color:#fff;">
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;opacity:.75;">${esc(siteConfig.businessName)}</div>
        <div style="font-size:24px;font-weight:800;margin-top:6px;">Request received</div>
      </td></tr>
      <tr><td style="padding:24px 24px 8px;font-size:15px;line-height:1.65;color:#334155;">
        <p style="margin:0 0 12px;font-size:17px;font-weight:800;color:${NAVY};">Hi ${esc(first)},</p>
        <p style="margin:0 0 12px;">Thanks for requesting a <strong>${what}</strong>. We got it.</p>
        <p style="margin:0 0 12px;">${next}</p>
      </td></tr>
      <tr><td style="padding:4px 24px 16px;">
        <a href="tel:${LP_PHONE_TEL}" style="display:block;background:${ORANGE};color:#fff;text-decoration:none;font-weight:800;font-size:16px;text-align:center;padding:14px;border-radius:10px;">Call ${LP_PHONE}</a>
        <p style="margin:8px 0 0;font-size:12px;color:#64748b;text-align:center;">Our call comes from this number. Save it so you know it’s us.</p>
      </td></tr>
      <tr><td style="padding:0 24px 20px;">
        <div style="background:#f7f8fa;border:1px solid #e6e8ec;border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.6;color:#334155;">
          <strong style="color:${NAVY};">Rather email?</strong> Just reply to this message. It goes straight to our team at ${REPLY_TO}.
        </div>
      </td></tr>
      <tr><td style="padding:0 24px 22px;font-size:13px;color:#64748b;line-height:1.6;">
        Address: ${esc(input.address)}<br/>Timeline: ${esc(input.timeline)}
      </td></tr>
      <tr><td style="padding:14px 24px;border-top:1px solid #e6e8ec;font-size:12px;color:#64748b;">
        ${esc(siteConfig.businessName)} · ${esc(siteConfig.address.full)} · ${esc(siteConfig.license.label)}
      </td></tr>
    </table>
    <p style="max-width:600px;margin:10px auto 0;text-align:center;font-size:11px;color:#94a3b8;">You received this because you requested a ${what} on solivanceelectric.com.</p>
  </div>`;

  await new Resend(apiKey).emails.send({
    from,
    to: [input.email],
    // Blind copy so the agency sees every confirmation without the lead seeing it.
    bcc: ['support@quicklaunchweb.us'],
    replyTo: REPLY_TO,
    subject: `We got your request — ${siteConfig.businessName}`,
    text,
    html,
  });
}
