'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { pushDataLayer } from '../../../lib/tracking';
import { LEAD_SEND_TO } from '../../_panel/googleAds';

// Fires the Google Ads lead conversion at most once per accepted submission.
//
// Loading this page is NOT the conversion. It asks the server to claim the
// submission; the server says yes exactly once (atomic SET NX). Then the sid
// is stripped from the URL, so a refresh has nothing to claim. Refresh, back/
// forward, a second tab, a bookmarked or hand-typed URL → no event.
// The ref guards React Strict Mode's double effect in dev; the server claim is
// the real guarantee.
export function ConversionClaim() {
  // Read once: the URL is cleaned below and Next re-syncs search params after that.
  const params = useSearchParams();
  const [sid] = useState(() => params.get('sid'));
  const started = useRef(false);
  const [state, setState] = useState(sid ? 'pending' : 'skipped:no_sid');

  useEffect(() => {
    if (started.current || !sid) return;
    started.current = true;
    window.history.replaceState(null, '', window.location.pathname);

    fetch('/api/panel-lead/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId: sid }),
      cache: 'no-store',
    })
      .then((r) => r.json())
      .then((res: { fire?: boolean; reason?: string }) => {
        if (res.fire) {
          pushDataLayer({ event: 'panel_lead_success', transaction_id: sid, lead_type: 'panel_inspection' });
          // Direct-tag mode (no GTM): send the Ads conversion ourselves.
          // transaction_id lets Google drop any duplicate that slips through.
          if (LEAD_SEND_TO) window.gtag?.('event', 'conversion', { send_to: LEAD_SEND_TO, transaction_id: sid });
          setState('fired');
        } else {
          setState(`skipped:${res.reason || 'unknown'}`);
        }
      })
      .catch(() => setState('skipped:claim_failed'));
  }, [sid]);

  // Visible to QA tools only (data attribute), not to visitors.
  return <span hidden data-conversion-state={state} />;
}
