import rss from '@astrojs/rss';
import { getPosts } from '@/lib/utils';

export async function GET() {
  const posts = await getPosts();
  const siteUrl = 'https://yourname.github.io';

  return rss({
    title: 'Seu Nome | Blog',
    description: 'Artigos sobre desenvolvimento web, design e tendências digitais.',
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.excerpt,
      link: `/blog/${post.slug}/`,
      categories: post.tags,
      author: post.author,
      customData: `
        <media:content
          type="image/jpeg"
          width="${post.coverImage.includes('placeholder') ? 800 : 1200}"
          height="${post.coverImage.includes('placeholder') ? 400 : 630}"
          medium="image"
          url="${siteUrl}${post.coverImage}"
        />
      `
    })),
    customData: `
      <language>pt-BR</language>
      <copyright>© ${new Date().getFullYear()} Seu Nome. Todos os direitos reservados.</copyright>
      <atom:link
        href="${siteUrl}/rss.xml"
        rel="self"
        type="application/rss+xml"
      />
    `
  });
}
