import { AuthProvider } from "@/shared/enum/User/AuthProvider";
import { UserStatus } from "@/shared/enum/User/Status";
import connectDb from "@/shared/lib/db";
import { User } from "@/shared/models/User/User.model";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Falta algún campo" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: AuthProvider.CREDENTIALS,
      status: UserStatus.ACTIVE,
    });
    console.log("Nuevo usuario creado:", newUser.toObject());
    return NextResponse.json(
      { success: true, userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
