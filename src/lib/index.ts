export { 
  getProjects, 
  getProjectBySlug, 
  getPosts, 
  getPostBySlug, 
  getAllTags,
  getPostsByTag,
  getProjectsByTag,
  searchContent,
  formatDate,
  formatReadingTime,
  getCurrentYear
} from './utils';
export type { Project, Post, SEOProps, NavItem, SocialLink } from './types';
