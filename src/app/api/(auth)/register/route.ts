// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/shared/models/User.model";
import connectDb from "@/shared/lib/db";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('hashedPassword', hashedPassword);
    console.log({ name, email, password, hashedPassword });
    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log("Nuevo usuario:", newUser);
    return NextResponse.json({ success: true, userId: newUser._id }, { status: 201 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
