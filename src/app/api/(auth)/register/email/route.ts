import { AuthProvider } from "@/shared/enum/User/AuthProvider";
import { UserStatus } from "@/shared/enum/User/Status";
import { generateRegistrationToken } from "@/shared/lib/authToken";
import connectDb from "@/shared/lib/db";
import { errorResponse } from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(request: Request) {
  try {
    await connectDb();
    const { email } = await request.json();

    if (!email) {
      return errorResponse("El email es obligatorio", 400);
    }

    // Ver si existe un usuario con ese email
    let existingUser = await User.findOne({ email });

    if (existingUser && existingUser.status === UserStatus.DONE) {
      return errorResponse("Ya existe un usuario con ese email", 400);
    }

    // Generar código de verificación
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Fecha de expiración: 15 minutos a partir de ahora
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);

    if (!existingUser) {
      // Crear nuevo usuario en estado MUST_CONFIRM_EMAIL
      existingUser = new User({
        email,
        status: UserStatus.MUST_CONFIRM_EMAIL,
        provider: AuthProvider.CREDENTIALS,
        verificationCode,
        verificationCodeExpires: expirationDate,
      });
    } else {
      // Si ya existía pero no estaba DONE, regenerar el código
      existingUser.verificationCode = verificationCode;
      existingUser.verificationCodeExpires = expirationDate;
    }

    await existingUser.save();

    const token = generateRegistrationToken(existingUser._id.toString());

    const msg = {
      to: email, // Change to your recipient
      from: "ferrodest1999@gmail.com", // Change to your verified sender
      subject: "This is a simple message",
      text: "which contains some text",
      html: `<strong>and some html${verificationCode}</strong>`,
    };

    sgMail.send(msg)
      .then(() => {

      })
      .catch((error) => {
        console.error(error);
      });

    const response = NextResponse.json({ success: true });
    response.cookies.set("registrationToken", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1h
      path: "/",
      // secure: true, // en producción con HTTPS
    });
    return response;
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
