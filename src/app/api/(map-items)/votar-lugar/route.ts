import mongoose from "mongoose";
import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse } from "@/shared/lib/httpResponse";
import Lugar from "@/shared/models/Lugar/Lugar.model";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { lugarId, vote } = await req.json();

    if (!lugarId || !["up", "down"].includes(vote)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const userDb = await UserService.findById(user.id);
    if (!userDb) {
      return NextResponse.json({ error: "Usuario no existe" }, { status: 404 });
    }

    const lugar = await Lugar.findById(lugarId);
    if (!lugar) {
      return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
    }

    // Verificar si el usuario ya votó
    const userIdObj = new mongoose.Types.ObjectId(userDb._id);
    const hasVotedUp = lugar.votes.up.some((uid) => uid.equals(userIdObj));
    const hasVotedDown = lugar.votes.down.some((uid) => uid.equals(userIdObj));

    if (hasVotedUp || hasVotedDown) {
      return NextResponse.json({ error: "Ya has votado este lugar" }, { status: 400 });
    }

    if (vote === "up") {
      lugar.votes.up.push(userIdObj);
    } else {
      lugar.votes.down.push(userIdObj);
    }

    await lugar.save();
    await UserService.incrementUserStat(userDb.id, "votedFutbolines");

    return NextResponse.json({ success: true, lugar }, { status: 200 });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
