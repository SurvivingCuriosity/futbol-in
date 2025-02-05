import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
}