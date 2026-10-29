'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { siteConfig } from '../config';

// Spanish via Google's page translator. The script only loads after a visitor
// picks Español (or already did on an earlier visit — the choice rides on the
// `googtrans` cookie), so English visitors download nothing extra.

export type Lang = 'en' | 'es';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (opts: Record<string, unknown>, id: string) => unknown;
      };
    };
  }
}

const SCRIPT_ID = 'google-translate-script';
const MOUNT_ID = 'google_translate_element';

export function currentLang(): Lang {
  return /(?:^|;\s*)googtrans=\/en\/es(?:;|$)/.test(document.cookie) ? 'es' : 'en';
}

const listeners = new Set<() => void>();
function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function notify() {
  listeners.forEach((fn) => fn());
}

function setTransCookie(value: string | null) {
  const host = window.location.hostname;
  const bare = host.replace(/^www\./, '');
  const expires = value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  // Google may write the cookie host-only or on the parent domain; clear every variant.
  for (const domain of ['', `; domain=${host}`, `; domain=.${bare}`]) {
    document.cookie = `googtrans=${value ?? ''}; path=/${domain}${expires}`;
    if (value) break;
  }
}

// Google Translate swaps text nodes for <font> wrappers, so React's later
// removeChild/insertBefore calls can target nodes that moved. Without this,
// a re-render on a translated page throws and blanks the screen.
// https://github.com/facebook/react/issues/11538
let domPatched = false;
function patchDomForTranslation() {
  if (domPatched || typeof Node !== 'function') return;
  domPatched = true;
  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };
  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref) as T;
  };
}

function selectSpanish() {
  // The cookie normally triggers translation on init; driving the hidden
  // dropdown covers the case where the script was already on the page.
  let tries = 0;
  const tick = () => {
    const combo = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
    if (combo) {
      combo.value = 'es';
      combo.dispatchEvent(new Event('change'));
      return;
    }
    if (++tries < 40) setTimeout(tick, 150);
  };
  tick();
}

// Google renders "service@…" as "servicio@…", a dead address. Mark every
// element that shows the email as untranslatable, including ones added later
// (mobile menu, dropdowns).
let contactGuarded = false;
function guardContactInfo() {
  if (contactGuarded) return;
  contactGuarded = true;
  const mark = (root: ParentNode) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = n.parentElement;
      if (el && n.nodeValue?.includes(siteConfig.email) && !el.classList.contains('notranslate')) {
        el.classList.add('notranslate');
        el.setAttribute('translate', 'no');
      }
    }
  };
  mark(document.body);
  new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => n.nodeType === 1 && mark(n as Element));
  }).observe(document.body, { childList: true, subtree: true });
}

function loadTranslator() {
  patchDomForTranslation();
  guardContactInfo();
  if (!document.getElementById(MOUNT_ID)) {
    const mount = document.createElement('div');
    mount.id = MOUNT_ID;
    mount.hidden = true;
    document.body.appendChild(mount);
  }
  if (document.getElementById(SCRIPT_ID)) {
    selectSpanish();
    return;
  }
  window.googleTranslateElementInit = () => {
    const T = window.google?.translate?.TranslateElement;
    if (!T) return;
    new T({ pageLanguage: 'en', includedLanguages: 'es', autoDisplay: false }, MOUNT_ID);
    selectSpanish();
  };
  const s = document.createElement('script');
  s.id = SCRIPT_ID;
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, currentLang, () => 'en' as Lang);
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const lang = useLang();

  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    if (currentLang() === 'es') loadTranslator();
  }, []);

  // The translator only handles the page it loaded on; content React swaps in
  // on a client-side route change stays English. While Spanish is on, internal
  // links do a full page load instead, so each page translates as it arrives.
  useEffect(() => {
    if (lang !== 'es') return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !a.href || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      e.preventDefault();
      window.location.assign(url.href);
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [lang]);

  // Fallback for navigation that doesn't come from a link click (router.push).
  useEffect(() => {
    if (pathname !== firstPath.current && currentLang() === 'es') window.location.reload();
  }, [pathname]);

  const toggle = () => {
    if (lang === 'en') {
      setTransCookie('/en/es');
      notify();
      loadTranslator();
    } else {
      // Restoring the original text in place is unreliable; a reload is clean.
      setTransCookie(null);
      window.location.reload();
    }
  };

  const next = lang === 'en' ? 'Español' : 'English';

  return (
    <button
      type="button"
      onClick={toggle}
      translate="no"
      lang={lang === 'en' ? 'es' : 'en'}
      aria-label={lang === 'en' ? 'Ver esta página en español' : 'View this page in English'}
      className={`notranslate inline-flex items-center gap-1.5 whitespace-nowrap font-bold text-white hover:text-[var(--onestop-gold)] transition-colors duration-200 ${className}`}
    >
      <Globe className="h-3 w-3" aria-hidden />
      <span className="sm:hidden">{lang === 'en' ? 'ES' : 'EN'}</span>
      <span className="hidden sm:inline">{next}</span>
    </button>
  );
}
