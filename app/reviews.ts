export type ReviewSource = 'Google' | 'Thumbtack';

export interface Review {
  id: string;
  author: string;
  source: ReviewSource;
  date: string; // ISO
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  scope?: string; // e.g. 'Wiring · Lights · Commercial'
}

export const reviews: Review[] = [
  {
    id: 'liberian-g',
    author: 'Liberian G.',
    source: 'Google',
    date: '2024-10-03',
    stars: 5,
    quote:
      'Solivance Electric was very professional and had great communication while I inquired about having a ceiling fan installed in my bedroom. I gave them the option to come on the weekend but they were available for same-day service. The install was prompt and their price was reasonable. I will definitely recommend Solivance Electric to friends and family.',
  },
  {
    id: 'tonya-n',
    author: 'Tonya N.',
    source: 'Google',
    date: '2021-06-15',
    stars: 5,
    quote:
      'On day two, the panel upgrade was completely finished exactly when Solivance Electric said it would be. They answered every question and addressed my concerns directly. The quality of the work and the customer service was excellent.',
  },
  {
    id: 'sandra-g',
    author: 'Sandra G.',
    source: 'Google',
    date: '2023-11-19',
    stars: 5,
    quote:
      'I recently hired Solivance Electric to replace the can lights in my home with LED. I was particularly impressed with the quality of the LED can lights they provided. The lighting in my home has been significantly improved — both in brightness and energy efficiency. I have noticed a decrease in my electricity bills since the installation. I RECOMMEND THEM 100%.',
  },
  {
    id: 'gabriella-o',
    author: 'Gabriella O.',
    source: 'Google',
    date: '2023-12-18',
    stars: 5,
    quote:
      'I submitted an inquiry to get pricing on a Level 2 EV charger install in my garage. I got a message from Solivance Electric about 5 minutes later asking if they could come by within the hour for an estimate, and could do the install as soon as the next day. Quick, efficient, and professional for the estimate. They ran the dedicated 240V circuit clean and walked me through the charger setup. 10/10. Will absolutely use Solivance Electric again for any electrical work.',
  },
  {
    id: 'zno-z',
    author: 'Zno Z.',
    source: 'Google',
    date: '2021-08-20',
    stars: 5,
    quote:
      'I was in contact with at least 7 other electricians to do a few repairs around my home. Two never showed up and kept rescheduling. Others gave a high estimate without ever coming to look at the work. Solivance Electric walked the house, handed back a fair fixed-fee number, and had the job done the next visit.',
  },
  {
    id: 'donyal-w',
    author: 'Donyal W.',
    source: 'Google',
    date: '2021-04-10',
    stars: 5,
    quote:
      'The whole experience with Solivance Electric was awesome. They got everything I asked for and more. During the job I was adding things to the scope and Solivance Electric was more than willing to accommodate. The price was fair and the work was clean.',
  },
  {
    id: 'yeny-v',
    author: 'Yeny V.',
    source: 'Google',
    date: '2024-07-25',
    stars: 5,
    quote:
      'I definitely recommend Solivance Electric to anyone looking for a great, honest electrician. I cannot say enough good things about this company. After being without power for two days after Hurricane Beryl, we reached out wanting a generator interlock installed. Solivance Electric came out that very same day — they had worked through the night to get to everyone else needing the same. They made it clear they were prioritizing homes with children and pets. Aside from the interlock, they found other issues in the panel that could have caused a fire. These are my go-to guys from here on.',
  },
  {
    id: 'harrison',
    author: 'Harrison',
    source: 'Google',
    date: '2022-09-12',
    stars: 5,
    quote:
      'On time — actually, early. Great work. Nice guys. Prices were the best I have ever been quoted for electrical work. Would happily recommend Solivance Electric to any friends.',
  },
  {
    id: 'joe-l',
    author: 'Joe L.',
    source: 'Google',
    date: '2022-11-29',
    stars: 5,
    quote:
      'Solivance Electric performed two jobs for me. First, they repaired two outlets and a light switch. Then they ran a dedicated subpanel and a 30A circuit out to my workshop. A professional, no-stress crew that does a very good job at a fair rate. I will be using them again.',
  },
  {
    id: 'william-d',
    author: 'William D.',
    source: 'Google',
    date: '2021-03-22',
    stars: 5,
    quote:
      'Solivance Electric installed a dedicated range-hood circuit and handled miscellaneous electrical items. They were prompt, courteous, and super competent. Best of all, overall nice guys. There were some challenges on the job, but they resolved them on the spot.',
  },
  {
    id: 'cody-o',
    author: 'Cody O.',
    source: 'Google',
    date: '2021-02-18',
    stars: 5,
    quote:
      "Honest opinions, honest recommendations, and didn't break the bank. Plus did outstanding work and completed ahead of schedule. Will definitely use Solivance Electric for all future electrical projects.",
  },
  {
    id: 'glenn-m',
    author: 'Glenn M.',
    source: 'Google',
    date: '2021-05-05',
    stars: 5,
    quote:
      'Prompt and very professional on the bathroom exhaust fan and dedicated circuit. Solivance Electric is the real deal.',
  },
  {
    id: 'robert-g',
    author: 'Robert G.',
    source: 'Google',
    date: '2022-07-14',
    stars: 5,
    quote: 'Solivance Electric. Excellent job. Would recommend.',
  },
  {
    id: 'michelle',
    author: 'Michelle',
    source: 'Google',
    date: '2022-10-02',
    stars: 5,
    quote:
      'Solivance Electric — on schedule, on budget, clean install. Happy customer.',
  },
  {
    id: 'tamika-a',
    author: 'Tamika A.',
    source: 'Thumbtack',
    date: '2024-07-24',
    stars: 5,
    quote:
      'Installed new lights in the shampoo area of my hair salon. Despite a busy schedule, Solivance Electric responded promptly and professionally. They went out of their way to pick up the specific fixtures I needed, ensuring they were exactly what I envisioned. The new lights work better than I expected, and the dimmer switch they installed adds the perfect touch to our shampoo area. Extremely pleased and look forward to working with them again. Highly recommend.',
    scope: 'Wiring · Lights · 8–10 ft ceiling · Commercial',
  },
  {
    id: 'kim-c',
    author: 'Kim C.',
    source: 'Thumbtack',
    date: '2023-03-21',
    stars: 5,
    quote:
      'Solivance Electric installed two ceiling fans for us and did an amazing job. They made sure all the details were squared away before we started and also walked me through the job. They charged the exact price they quoted (significantly lower than another company we called) and kept the work areas clean. They also made sure our new smoke alarm was hardwired in and working. Very professional and clean. Will definitely recommend.',
    scope: 'Ceiling fan installation · Residential',
  },
  {
    id: 'alco',
    author: 'Alco',
    source: 'Thumbtack',
    date: '2026-04-04',
    stars: 5,
    quote:
      'Great price. We had an outstanding experience with the Solivance Electric crew. From start to finish, the level of professionalism, care, work ethic, and overall value was truly exceptional.',
  },
  {
    id: 'dan-h',
    author: 'Dan H.',
    source: 'Thumbtack',
    date: '2023-03-22',
    stars: 5,
    quote:
      'Solivance Electric came out to my house at midnight to help get my power back on. Incredibly responsive and knowledgeable, and figured out the issue quickly. A+ electricians. Highly recommend.',
    scope: 'Emergency · Power restoration',
  },
  {
    id: 'allyson',
    author: 'Allyson',
    source: 'Google',
    date: '2023-01-13',
    stars: 5,
    quote:
      'Not on time — early. Great work. Nice guys. Prices were the best I have ever been quoted for electrical work. Would be happy to recommend Solivance Electric to any friends.',
  },
  {
    id: 'thumbtack-nov-2024',
    author: 'Verified Thumbtack customer',
    source: 'Thumbtack',
    date: '2024-11-20',
    stars: 5,
    quote:
      'Solivance Electric was very responsive. They arrived late one afternoon, identified the issue, and corrected everything the following morning.',
    scope: 'Electrical (lighting or power) · Replace existing wiring · House',
  },
];

export const reviewStats = {
  count: reviews.length,
  average: Number(
    (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1),
  ),
  googleCount: reviews.filter((r) => r.source === 'Google').length,
  thumbtackCount: reviews.filter((r) => r.source === 'Thumbtack').length,
};
