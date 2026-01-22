import { getProjects } from '@/lib/utils';

export async function GET() {
  const projects = await getProjects();
  
  return new Response(JSON.stringify(projects), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
