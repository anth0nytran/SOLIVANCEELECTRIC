// Push every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver).
// Bing's index feeds ChatGPT search and Copilot, so new or retitled pages reach them in
// hours instead of waiting weeks for a crawl.
//
// Run AFTER a production deploy:  node scripts/indexnow.mjs
// The key file public/560c911d690222de7a992de6058ac6f5.txt must be live at https://www.solivanceelectric.com/560c911d690222de7a992de6058ac6f5.txt

const HOST = 'www.solivanceelectric.com';
const KEY = '560c911d690222de7a992de6058ac6f5';

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urlList.length) throw new Error('No URLs found in sitemap');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
if (res.status >= 400) console.log(await res.text());
