import connectDb from "@/lib/db"
import User from "@/models/User.model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(){
    try{
        await connectDb()

        const users = await User.find({}).lean()

        return NextResponse.json({ success: true, data: users })

    }catch(e){
        console.error(e)
        return NextResponse.json(
            { success: false, message: (e as Error).message },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
  try {
    console.log('Estamos en el post')
    await connectDb();
    
    const body = await req.json();
    console.log('El body es: ',body)
    const newUser = await User.create(body);
    console.log('New user ', newUser)

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
