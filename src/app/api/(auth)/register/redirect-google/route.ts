// app/api/register/redirect-google/route.ts
import { UserStatus } from "@/shared/enum/User/Status";
import { authOptions } from "@/shared/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1) Cargar la sesión
  
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // No hay sesión => redirige a login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2) Chequear el status
  const userStatus = session.user.status; 

  if (userStatus === UserStatus.MUST_CREATE_USERNAME) {
    return NextResponse.redirect(new URL("/register/init-username", request.url));
  }

  // Si ya está DONE o cualquier otro caso, lo mandas a tu Home
  return NextResponse.redirect(new URL("/", request.url));
}
