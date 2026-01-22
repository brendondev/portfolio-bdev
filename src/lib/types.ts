export interface Project {
  slug: string;
  title: string;
  headline: string;
  year: string;
  role: string;
  stack: string[];
  tags: string[];
  coverImage: string;
  gallery: string[];
  problem: string;
  solution: string;
  results: string[];
  links: { label: string; url: string }[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  coverImage: string;
  readingTime: number;
  author: string;
  canonical?: string;
  content: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
