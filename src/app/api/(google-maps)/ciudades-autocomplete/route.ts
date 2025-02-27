import { successResponse } from '@/shared/lib/httpResponse';
import { GoogleMapsService } from '@/shared/services/GoogleMaps/GoogleMapsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input") || "";

  const data = await GoogleMapsService.autocomplete(input, '(cities)');
  
  return successResponse(data);
}
