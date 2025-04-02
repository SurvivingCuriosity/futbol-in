import { NextResponse } from "next/server";
import { z } from "zod";

export const handleError = (error: unknown): NextResponse => {
  if (error instanceof z.ZodError) {
    console.log(error)
    return NextResponse.json(
      {
        type: "VALIDATION_ERROR",
        errors: error.errors.map(err => ({
          path: err.path,      // ['email']
          message: err.message // 'El correo electrónico...'
        }))
      },
      { status: 400 }
    );
  }

  // Errores “genéricos”
  return NextResponse.json(
    {
      type: "SERVER_ERROR",
      error: getErrorMessage(error),
    },
    { status: 500 }
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

