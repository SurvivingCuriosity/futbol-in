// shared/lib/httpResponse.ts
import { NextResponse } from "next/server";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export function errorResponse(err: unknown, status = 500) {
  return NextResponse.json({ error: getErrorMessage(err) }, { status });
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
