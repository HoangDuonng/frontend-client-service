const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in .env.local');
}

export async function GET(request: Request) {
  const res = await fetch(`${API_BASE_URL}/tours`);
  if (!res.ok) {
    return new Response('Failed to fetch tours', { status: 500 });
  }
  const data = await res.json();
  return Response.json(data.data || []);
}
