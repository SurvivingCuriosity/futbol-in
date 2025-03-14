import { successResponse } from '@/server/lib/httpResponse';
import { GoogleMapsService } from '@/server/services/GoogleMaps/GoogleMapsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input") || "";

  const data = await GoogleMapsService.autocomplete(input, '(cities)');
  
  return successResponse(data);
}
