const API_FILE_URL = process.env.NEXT_PUBLIC_API_FILE_URL;

if (!API_FILE_URL) {
  throw new Error('NEXT_PUBLIC_API_FILE_URL is not defined in .env.local');
}

export async function GET(request: Request) {
  const res = await fetch(`${API_FILE_URL}/api/tours`);
  if (!res.ok) {
    return new Response('Failed to fetch tours', { status: 500 });
  }
  const data = await res.json();
  return Response.json(data.data || []);
}
