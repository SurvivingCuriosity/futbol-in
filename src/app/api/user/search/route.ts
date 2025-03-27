// app/api/users/search/route.ts
import { NextResponse } from "next/server";
import { UserService } from "@/server/services/User/UserService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    // Llamamos a un método que busque por nombre/email/etc
    const users = await UserService.searchByName(query);

    // Retornamos el array de usuarios
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
