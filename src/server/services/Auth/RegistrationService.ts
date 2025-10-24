import { AuthProvider } from "futbol-in-core/enum";
import { UserStatus } from "futbol-in-core/enum";
import { generateRegistrationToken, verifyRegistrationToken } from "@/server/lib/authToken";
import { IUserDocument } from "@/server/models/User/User.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { UserService } from "../User/UserService";
import { sendVerifyEmail } from "../Mail/MailService";

export class RegistrationService {
  
  static createRegistrationResponse(
    userId: string,
    userStatus: UserStatus,
    doneRedirectUrl: string = '/login'
  ): NextResponse {
    const token = generateRegistrationToken(userId);
    let redirectUrl: string;

    switch (userStatus) {
      case UserStatus.MUST_CONFIRM_EMAIL:
        redirectUrl = "/register/confirm-email";
        break;
      case UserStatus.MUST_INIT_ACCOUNT:
        redirectUrl = "/register/init-account";
        break;
      case UserStatus.DONE:
        redirectUrl = doneRedirectUrl;
        break;
      default:
        throw new Error(`Estado de usuario no manejado: ${userStatus}`);
    }

    const response = NextResponse.json({ redirect: redirectUrl });

    if (userStatus === UserStatus.DONE) {
      // Si está donde limpiamos la cookie
      response.cookies.set("registrationToken", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
      });
    } else {
      // Si no está done creamos la cookie
      response.cookies.set("registrationToken", token, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hora
        path: "/",
      });
    }

    return response;
  }

  static async registerByEmail(email: string): Promise<string> {
    let user: IUserDocument | null = await UserService.findByEmail(email);

    if (user && user.status === UserStatus.DONE) {
      throw new Error("Ya existe un usuario con ese email");
    }

    // Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Establecer fecha de expiración (15 minutos a partir de ahora)
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);

    if (!user) {
      // Crear nuevo usuario en estado MUST_CONFIRM_EMAIL
      user = await UserService.createUser({
        email,
        status: UserStatus.MUST_CONFIRM_EMAIL,
        provider: AuthProvider.CREDENTIALS,
        verificationCode,
        verificationCodeExpires: expirationDate,
      });
    } else {
      // Si ya existe pero no está confirmado, actualizar el código
      user.verificationCode = verificationCode;
      user.verificationCodeExpires = expirationDate;
      await user.save()
    }

    await sendVerifyEmail(email, verificationCode);

    return user._id.toString()
  }

  /**
   * Verifica el código de verificación enviado y actualiza el estado del usuario.
   * @param token Token obtenido de la cookie.
   * @param code Código de verificación ingresado por el usuario.
   * @throws Error si la verificación falla.
   */
  static async verifyRegistrationCode(token: string, code: string): Promise<void> {
    // Verificar token y obtener payload
    const payload = verifyRegistrationToken(token);

    // Buscar usuario por ID (puedes delegar en UserService para mantener la abstracción)
    const user = await UserService.findById(payload.userId);
    
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.status !== UserStatus.MUST_CONFIRM_EMAIL) {
      throw new Error(`Estado incorrecto: ${user.status}`);
    }
    if (user.verificationCode !== code) {
      throw new Error("Código de verificación inválido");
    }
    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      throw new Error("El código ha expirado");
    }

    
    // Actualizar estado del usuario y limpiar datos de verificación
    user.status = user.name ? UserStatus.DONE : UserStatus.MUST_INIT_ACCOUNT;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
  }

  /**
   * Inicializa la cuenta del usuario, asignando username y password.
   * @param token Token de registro obtenido de la cookie.
   * @param username Nombre de usuario que se desea asignar.
   * @param password Contraseña en texto plano que se deberá hashear.
   * @throws Error en caso de inconsistencias o validaciones fallidas.
   */
  static async initializeAccount(token: string, username: string, password: string): Promise<void> {
    // Verificar el token y obtener el payload
    const payload = verifyRegistrationToken(token);

    // Buscar al usuario por ID (delegamos en UserService)
    const user = await UserService.findById(payload.userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.status !== UserStatus.MUST_INIT_ACCOUNT) {
      throw new Error("No puedes crear credenciales todavía");
    }

    // Verificar si el username ya está en uso
    const existingUser = await UserService.findByUsername(username);
    if (existingUser) {
      throw new Error("El username ya está en uso");
    }

    // Asignar el username y la contraseña hasheada, y actualizar el estado
    user.name = username;
    user.password = bcrypt.hashSync(password, 10);
    user.status = UserStatus.DONE;
    await user.save();
  }
}
