export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  content: string;
}
