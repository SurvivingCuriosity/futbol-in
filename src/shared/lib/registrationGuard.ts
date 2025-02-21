// shared/lib/registrationGuard.ts
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import connectDb from "@/shared/lib/db";
import { User } from "@/shared/models/User/User.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * requireRegistrationUser:
 *   - Verifica que exista un "registrationToken" en las cookies.
 *   - Valida el token (JWT) para obtener userId.
 *   - Carga el usuario en la BD.
 *   - Si algo falla o el usuario no está, hace `redirect("/register")`.
 *
 * Retorna el usuario si todo está bien.
 */
export async function requireRegistrationUser() {
  // 1) Leer cookie
  const cookiesStore = await cookies();
  const token = cookiesStore.get("registrationToken")?.value;
  if (!token) {
    redirect("/register");
  }

  await connectDb();

  try {
    // 2) Decodificar token para obtener userId
    const { userId } = verifyRegistrationToken(token);
    const user = await User.findById(userId);

    if (!user) {
      redirect("/register");
    }

    return user!;
  } catch (error:unknown) {
    console.error(error);
    redirect("/register");
  }
}

/**
 * requireRegistrationStep:
 *   - Llama a requireRegistrationUser para cargar el usuario
 *   - Comprueba si el user.status coincide con el "expectedStatus"
 *   - Si no coincide, redirige al paso correcto (o a donde quieras).
 *   - Retorna el usuario si todo está bien.
 */
export async function requireRegistrationStep(expectedStatus: UserStatus) {
  const user = await requireRegistrationUser();

  if (user.status !== expectedStatus) {
    // Si el status no coincide, decides a dónde redirigirlo.
    switch (user.status) {
      case UserStatus.MUST_CONFIRM_EMAIL:
        redirect("/register/confirm-email");
      case UserStatus.MUST_INIT_ACCOUNT:
        redirect("/register/init-account");
      case UserStatus.DONE:
        redirect("/");
      default:
        redirect("/register");
    }
  }

  return user;
}
