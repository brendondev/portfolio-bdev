import { getPosts } from '@/lib/utils';

export async function GET() {
  const posts = await getPosts();
  
  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
