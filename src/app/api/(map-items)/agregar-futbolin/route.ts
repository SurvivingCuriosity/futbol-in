// src/app/api/futbolines/route.ts
import { NextResponse } from "next/server";
import connectDb from "@/shared/lib/db";
import Futbolin from "@/shared/models/Futbolin.model";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { nombre, direccion, lat, lng, googlePlaceId } = await req.json();

    if (!nombre || !direccion || !lat || !lng || !googlePlaceId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newFutbolin = await Futbolin.create({
      nombre,
      direccion,
      googlePlaceId,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    return NextResponse.json({ success: true, futbolin: newFutbolin }, { status: 201 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
