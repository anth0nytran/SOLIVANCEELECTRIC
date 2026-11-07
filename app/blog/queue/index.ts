import type { BlogPost } from '../types';
import { posts_2026_11 } from './2026-11';
import { posts_2026_12 } from './2026-12';
import { posts_2027_01 } from './2027-01';
import { posts_2027_02 } from './2027-02';
import { posts_2027_03 } from './2027-03';
import { posts_2027_04 } from './2027-04';

/**
 * November's six went live together on 2026-11-07; December through April run six a month, spread out.
 * Each post goes live on its own `date` — see isPublished() in ../posts.ts.
 */
export const scheduledPosts: BlogPost[] = [
  ...posts_2026_11,
  ...posts_2026_12,
  ...posts_2027_01,
  ...posts_2027_02,
  ...posts_2027_03,
  ...posts_2027_04,
];
