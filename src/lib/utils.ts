import type { Project, Post } from './types';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getProjects(): Promise<Project[]> {
  const files = await glob(`${CONTENT_DIR}/projects/*.json`);
  const projects = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      return JSON.parse(content) as Project;
    })
  );
  return projects.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getPosts(): Promise<Post[]> {
  const files = await glob(`${CONTENT_DIR}/posts/*.json`);
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      return JSON.parse(content) as Post;
    })
  );
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllTags(projects: Project[], posts: Post[]): string[] {
  const projectTags = projects.flatMap((p) => p.tags);
  const postTags = posts.flatMap((p) => p.tags);
  const allTags = [...new Set([...projectTags, ...postTags])];
  return allTags.sort();
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag));
}

export function getProjectsByTag(projects: Project[], tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function searchContent(items: (Project | Post)[], query: string): (Project | Post)[] {
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    const searchableText = [
      'title' in item ? item.title : '',
      'headline' in item ? item.headline : '',
      'excerpt' in item ? item.excerpt : '',
      'tags' in item ? item.tags.join(' ') : ''
    ].join(' ').toLowerCase();
    return searchableText.includes(lowerQuery);
  });
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`;
}

export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}
